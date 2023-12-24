'use strict'

const bcrypt = require('bcrypt')
const userService = require('./userService')
const keyTokenService = require('./keyTokenService')
const {
  ConflictError, InternalServerError,
  UnAuthorizedError, NotFoundError
} = require('../../../core/errorResponse')
const { createKeyPairRsa, createTokenPair } = require('../utils/authUtil')
const { getDataInfo } = require('../utils')

const {
  auth: { accessTokenLife, refreshTokenLife }
} = require('../../../configs/environmentConfig')

class AccessService {
  static async signUp(requestBody = {}) {
    const {
      lastName, firstName, gender,
      dateOfBirth, address, phoneNumber,
      email, username, password
    } = requestBody
    const user = await userService.findByUsername(username)
    if (user) throw new ConflictError('User already exists')
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await userService.createUser({
      lastName, firstName, gender,
      dateOfBirth, address, phoneNumber,
      email, username, password: passwordHash
    })
    if (!newUser) throw new InternalServerError('Sign up failure')

    const payload = { userId: newUser._id, username }
    const { publicKey, privateKey } = createKeyPairRsa()
    const { accessToken, refreshToken } = createTokenPair(
      payload,
      privateKey,
      accessTokenLife,
      refreshTokenLife
    )

    const newKeyToken = await keyTokenService.createKeyToken(
      newUser._id,
      publicKey,
      privateKey,
      refreshToken
    )
    if (!newKeyToken) throw new InternalServerError('Automatic sign in failure')

    return {
      user: getDataInfo(newUser, ['_id', 'lastName', 'firstName', 'account.username']),
      tokens: {
        accessToken,
        refreshToken: newKeyToken.refreshToken
      }
    }
  }

  static async signIn(requestBody = {}) {
    const { username = '', password = '' } = requestBody
    const foundUser = await userService.findByUsername(username)
    if (!foundUser) throw new UnAuthorizedError()

    const match = await bcrypt.compare(password, foundUser.account.password)
    if (!match) throw new UnAuthorizedError()

    const foundKeyToken = await keyTokenService.findByUserId(foundUser._id)
    const payload = { userId: foundUser._id, username: foundUser.account.username }

    if (!foundKeyToken) {
      const { publicKey, privateKey }= createKeyPairRsa()
      const { accessToken, refreshToken } = createTokenPair(
        payload,
        privateKey,
        accessTokenLife,
        refreshTokenLife
      )

      const newKeyToken = await keyTokenService.createKeyToken(
        foundUser._id,
        publicKey,
        privateKey,
        refreshToken
      )
      if (!newKeyToken) throw new InternalServerError()

      return {
        user: getDataInfo(foundUser, ['_id', 'lastName', 'firstName', 'account.username']),
        tokens: {
          accessToken,
          refreshToken: newKeyToken.refreshToken
        }
      }
    }

    const { accessToken, refreshToken } = createTokenPair(
      payload,
      foundKeyToken.privateKey,
      accessTokenLife,
      refreshTokenLife
    )

    const { acknowledged } = await keyTokenService.updateKeyToken(
      { _id: foundKeyToken._id },
      { refreshToken }
    )
    if (!acknowledged) throw new InternalServerError()

    return {
      user: getDataInfo(foundUser, ['_id', 'lastName', 'firstName', 'account.username']),
      tokens: {
        accessToken,
        refreshToken
      }
    }
  }

  static async signOut(keyToken = {}) {
    const { _id } = keyToken
    const { acknowledged } = await keyTokenService.deleteById(_id)
    if (!acknowledged) throw new InternalServerError('Sign out failure')

    return {}
  }

  static async handleRefreshToken(keyToken = {}, user = {}, refreshToken = '') {
    const { userId, username } = user
    const payload = { userId, username }
    const tokens = createTokenPair(
      payload,
      keyToken.privateKey,
      accessTokenLife,
      refreshTokenLife
    )

    await keyTokenService.updateKeyToken(
      { _id: keyToken._id },
      {
        $set: {
          refreshToken: tokens.refreshToken
        },
        $addToSet: {
          refreshTokensUsed: refreshToken
        }
      }
    )

    const foundUser = await userService.findById(userId)
    if (!foundUser) throw new NotFoundError('Not found user')
    return {
      user: getDataInfo(foundUser, ['_id', 'lastName', 'firstName', 'account.username']),
      tokens
    }
  }
}

module.exports = AccessService
