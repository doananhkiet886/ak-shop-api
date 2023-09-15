'use strict'

const bcrypt = require('bcrypt')
const userService = require('./user.service')
const keyTokenService = require('./keyToken.service')
const {
  ConflictError,
  InternalServerError
} = require('../../../core/errorResponse')
const { createKeyPairRsa, createTokenPair } = require('../utils/auth.util')
const getDataInfo = require('../utils/getDataInfo.util')

const ACCESS_TOKEN_EXPIRES_IN = '7 days'
const REFRESH_TOKEN_EXPIRES_IN = '14 days'

class AccessService {
  async signup({
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
      accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
      refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN
    })

    const newKeyToken = await keyTokenService.createKeyToken({
      userId: newUser._id,
      publicKey,
      privateKey,
      refreshToken
    })

    return {
      user: getDataInfo(newUser, ['_id', 'lastName', 'firstName', 'account.username']),
      tokens: {
        accessToken,
        refreshToken: newKeyToken.refreshToken
      }
    }
  }
}

module.exports = new AccessService()
