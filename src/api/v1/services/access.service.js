'use strict'

const bcrypt = require('bcrypt')
const userService = require('./user.service')
const keyTokenService = require('./keyToken.service')
const {
  ConflictError,
  InternalServerError,
  UnAuthorizedError,
  MyError
} = require('../../../core/errorResponse')
const { createKeyPairRsa, createTokenPair, verifyToken } = require('../utils/auth.util')
const getDataInfo = require('../utils/getDataInfo.util')

const {
  auth: { accessTokenLife, refreshTokenLife }
} = require('../../../configs/environment.config')

class AccessService {
  async signUp({
    lastName,
    firstName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    email,
    username,
    password
  }) {
    const user = await userService.findByUsername(username)
    if (user) throw new ConflictError('User already exists')
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await userService.createUser({
      lastName,
      firstName,
      gender,
      dateOfBirth,
      address,
      phoneNumber,
      email,
      username,
      password: passwordHash
    })
    if (!newUser) throw new InternalServerError('Signup failure')

    const payload = { userId: newUser._id, username }
    const { publicKey, privateKey } = createKeyPairRsa()
    const { accessToken, refreshToken } = createTokenPair({
      payload,
      privateKey,
      accessTokenExpiresIn: accessTokenLife,
      refreshTokenExpiresIn: refreshTokenLife
    })

    const newKeyToken = await keyTokenService.createKeyToken({
      userId: newUser._id,
      publicKey,
      privateKey,
      refreshToken
    })
    if (!newKeyToken) throw new InternalServerError()

    return {
      user: getDataInfo(newUser, ['_id', 'lastName', 'firstName', 'account.username']),
      tokens: {
        accessToken,
        refreshToken: newKeyToken.refreshToken
      }
    }
  }

  /**
   * 1 - check username in db
   * 2 - check match password
   * 3 - get privateKey in db by userId
   * 4 - create AT vs RT
   * 5 - save RT in db
   * 6 - return AT, RT, userId, username, lastName, firstName
   */
  async signIn({ username = '', password = '' }) {
    const foundUser = await userService.findByUsername(username)
    if (!foundUser) throw new UnAuthorizedError()

    const match = await bcrypt.compare(password, foundUser.account.password)
    if (!match) throw new UnAuthorizedError()

    const foundKeyToken = await keyTokenService.findByUserId(foundUser._id)
    const payload = { userId: foundUser._id, username: foundUser.account.username }

    if (!foundKeyToken) {
      const { publicKey, privateKey }= createKeyPairRsa()
      const { accessToken, refreshToken } = createTokenPair({
        payload,
        privateKey,
        accessTokenExpiresIn: accessTokenLife,
        refreshTokenExpiresIn: refreshTokenLife
      })

      const newKeyToken = await keyTokenService.createKeyToken({
        userId: foundUser._id,
        publicKey,
        privateKey,
        refreshToken
      })
      if (!newKeyToken) throw new InternalServerError()

      return {
        user: getDataInfo(foundUser, ['_id', 'lastName', 'firstName', 'account.username']),
        tokens: {
          accessToken,
          refreshToken: newKeyToken.refreshToken
        }
      }
    }

    const { accessToken, refreshToken } = createTokenPair({
      payload,
      privateKey: foundKeyToken.privateKey,
      accessTokenExpiresIn: accessTokenLife,
      refreshTokenExpiresIn: refreshTokenLife
    })

    const { acknowledged } = await keyTokenService.updateKeyToken({
      filter: { _id: foundKeyToken._id },
      update: { refreshToken }
    })
    if (!acknowledged) throw new InternalServerError()

    return {
      user: getDataInfo(foundUser, ['_id', 'lastName', 'firstName', 'account.username']),
      tokens: {
        accessToken,
        refreshToken
      }
    }
  }

  async signOut({ keyToken = {} }) {
    const hasIdProperty = keyToken?._id
    if (!hasIdProperty) throw new MyError('Invalid parameter in accessService.signOut function', 500)

    const { acknowledged } = await keyTokenService.deleteById(keyToken._id)
    if (!acknowledged) throw new InternalServerError('Sign out failure')

    return {}
  }

  async handleRefreshToken(refreshToken = '') {
    const foundKeyToken = await keyTokenService.findByRefreshTokenUsed(refreshToken)
    if (foundKeyToken) {
      const { userId } = verifyToken({
        token: refreshToken, secretOrPublicKey: foundKeyToken.privateKey
      })
      await keyTokenService.deleteByUserId(userId)
      throw new UnAuthorizedError()
    }

    const holderKeyToken = await keyTokenService.findByRefreshToken(refreshToken)
    if (!holderKeyToken) throw new UnAuthorizedError()

    const holderUser = await userService.findById(holderKeyToken.userId)
    if (!holderKeyToken) throw new UnAuthorizedError()

    const tokens = createTokenPair({
      payload: { userId: holderUser._id, username: holderUser.account.username },
      privateKey: holderKeyToken.privateKey,
      accessTokenExpiresIn: accessTokenLife,
      refreshTokenExpiresIn: refreshTokenLife
    })

    await keyTokenService.updateKeyToken({
      filter: { _id: holderKeyToken._id },
      update: {
        $set: {
          refreshToken: tokens.refreshToken
        },
        $addToSet: {
          refreshTokensUsed: refreshToken
        }
      }
    })

    return {
      user: getDataInfo(holderUser, ['_id', 'lastName', 'firstName', 'account.username']),
      tokens
    }
  }
}

module.exports = new AccessService()
