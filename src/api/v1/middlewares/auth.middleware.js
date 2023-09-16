'use strict'

const apiKeyService = require('../services/apiKey.service')
const userService = require('../services/user.service')
const keyTokenService = require('../services/keyToken.service')
const { verifyToken } = require('../utils/auth.util')
const {
  ForbiddenError,
  UnAuthorizedError,
  BadRequestError
} = require('../../../core/errorResponse')

const HEADERS = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization'
}

class AuthMiddleware {
  async checkApiKey(req, res, next) {
    const apiKey = req.headers[HEADERS.API_KEY]
    if (!apiKey) throw new ForbiddenError()

    const apiKeyObj = await apiKeyService.findByKey(apiKey)
    if (!apiKeyObj) throw new ForbiddenError()

    req.apiKeyObj = apiKeyObj
    next()
  }

  checkPermission(permission = '') {
    return async (req, res, next) => {
      const { permissions } = req.apiKeyObj
      if (!permission) throw new UnAuthorizedError()

      const isValidPermission = permissions.includes(permission)
      if (!isValidPermission) throw new UnAuthorizedError()

      next()
    }
  }

  /**
    1 - check user id from client missing?
    2 - check accessToken from client missing?
    3 - check user id in db
    4 - get keyToken in db by user id
    5 - verify accessToken by keyToken.publicKey
    6 - check match payload.userId vs user id
    7 - Ok all ⇒ req.keyToken = keyToken and next()
   */
  async authenticate(req, res, next) {
    const userId = req.headers[HEADERS.CLIENT_ID]
    const accessToken = req.headers[HEADERS.AUTHORIZATION]
    const missing = !userId || !accessToken
    if (missing) throw new BadRequestError()

    try {
      const foundUser = await userService.findById(userId)
      if (!foundUser) throw new UnAuthorizedError()

      const keyToken = await keyTokenService.findByUserId(userId)
      if (!keyToken) throw new UnAuthorizedError()

      const payload = verifyToken({
        token: accessToken,
        secretOrPublicKey: keyToken.publicKey
      })

      const match = userId === payload.userId
      if (!match) throw new UnAuthorizedError()

      req.keyToken = keyToken
      return next()
    } catch (error) {
      throw new UnAuthorizedError()
    }
  }
}

module.exports = new AuthMiddleware()
