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
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-refresh-token'
}

class AuthMiddleware {
  async checkApiKey(req, res, next) {
    const apiKey = req.headers[HEADERS.API_KEY]
    if (!apiKey) throw new ForbiddenError(`${HEADERS.API_KEY} missing`)

    const apiKeyObj = await apiKeyService.findByKey(apiKey)
    if (!apiKeyObj) throw new ForbiddenError(`Invalid ${HEADERS.API_KEY}`)

    req.apiKeyObj = apiKeyObj
    next()
  }

  checkPermission(permission = '') {
    return async (req, res, next) => {
      const { permissions } = req.apiKeyObj
      const isEmpty = permissions.length == 0
      if (isEmpty) throw new UnAuthorizedError('No permission')

      const isValidPermission = permissions.includes(permission)
      if (!isValidPermission) throw new UnAuthorizedError('No permission')

      next()
    }
  }

  async authenticate(req, res, next) {
    const userId = req.headers[HEADERS.CLIENT_ID]
    if (!userId) throw new BadRequestError(`${HEADERS.CLIENT_ID} missing`)

    const foundKeyToken = await keyTokenService.findByUserId(userId)
    if (!foundKeyToken) throw new UnAuthorizedError()

    const refreshToken = req.headers[HEADERS.REFRESH_TOKEN]
    if (refreshToken) {
      try {
        const decodedUser = verifyToken({
          token: refreshToken,
          secretOrPublicKey: foundKeyToken.publicKey
        })

        if (userId !== decodedUser.userId)
          throw new UnAuthorizedError('Invalid user id')

        const isUsedRefreshToken =
          foundKeyToken?.refreshTokensUsed.includes(refreshToken)
        if (isUsedRefreshToken) {
          await keyTokenService.deleteByUserId(decodedUser.userId)
          throw new ForbiddenError('Something happened')
        }

        const isValidRefreshToken = foundKeyToken.refreshToken === refreshToken
        if (!isValidRefreshToken)
          throw new UnAuthorizedError(`Invalid ${HEADERS.REFRESH_TOKEN}`)

        req.keyToken = foundKeyToken
        req.user = decodedUser
        req.refreshToken = refreshToken
        return next()
      } catch (error) {
        throw new UnAuthorizedError(`Invalid ${HEADERS.REFRESH_TOKEN}`)
      }
    }

    const accessToken = req.headers[HEADERS.AUTHORIZATION]
    if (!accessToken)
      throw new BadRequestError(`${HEADERS.AUTHORIZATION} missing`)

    const foundUser = await userService.findById(userId)
    if (!foundUser) throw new UnAuthorizedError(`Invalid ${HEADERS.CLIENT_ID}`)

    try {
      const decodedUser = verifyToken({
        token: accessToken,
        secretOrPublicKey: foundKeyToken.publicKey
      })

      const match = userId === decodedUser.userId
      if (!match) throw new UnAuthorizedError('Invalid user id')

      req.keyToken = foundKeyToken
      return next()
    } catch (error) {
      const isExpiredToken = error.name === 'TokenExpiredError'
      if (isExpiredToken)
        throw new UnAuthorizedError(`Expired ${HEADERS.AUTHORIZATION}`)
    }
  }
}

module.exports = new AuthMiddleware()
