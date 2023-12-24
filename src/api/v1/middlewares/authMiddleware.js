'use strict'

const apiKeyService = require('../services/apiKeyService')
const userService = require('../services/userService')
const keyTokenService = require('../services/keyTokenService')
const { verifyToken } = require('../utils/authUtil')
const {
  ForbiddenError,
  UnAuthorizedError,
  BadRequestError
} = require('../../../core/errorResponse')

const REQUEST_HEADERS = require('../utils/requestHeadersUtil')

class AuthMiddleware {
  async checkApiKey(req, res, next) {
    const apiKey = req.headers[REQUEST_HEADERS.API_KEY]
    if (!apiKey) throw new ForbiddenError(`${REQUEST_HEADERS.API_KEY} missing`)

    const apiKeyObj = await apiKeyService.findByKey(apiKey)
    if (!apiKeyObj) throw new ForbiddenError(`Invalid ${REQUEST_HEADERS.API_KEY}`)

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
    const userId = req.headers[REQUEST_HEADERS.CLIENT_ID]
    if (!userId) throw new BadRequestError(`${REQUEST_HEADERS.CLIENT_ID} missing`)

    const foundKeyToken = await keyTokenService.findByUserId(userId)
    if (!foundKeyToken) throw new UnAuthorizedError()

    // const refreshToken = req.headers[REQUEST_HEADERS.REFRESH_TOKEN]
    // if (refreshToken) {
    //   try {
    //     const decodedUser = verifyToken(refreshToken, foundKeyToken.publicKey)

    //     if (userId !== decodedUser.userId)
    //       throw new UnAuthorizedError('Invalid user id')

    //     const isUsedRefreshToken =
    //       foundKeyToken?.refreshTokensUsed.includes(refreshToken)
    //     if (isUsedRefreshToken) {
    //       await keyTokenService.deleteByUserId(decodedUser.userId)
    //       throw new ForbiddenError('Something happened')
    //     }

    //     const isValidRefreshToken = foundKeyToken.refreshToken === refreshToken
    //     if (!isValidRefreshToken)
    //       throw new UnAuthorizedError(`Invalid ${REQUEST_HEADERS.REFRESH_TOKEN}`)

    //     req.keyToken = foundKeyToken
    //     req.user = decodedUser
    //     req.refreshToken = refreshToken
    //     return next()
    //   } catch (error) {
    //     throw new UnAuthorizedError(`Invalid ${REQUEST_HEADERS.REFRESH_TOKEN}`)
    //   }
    // }

    const accessToken = req.headers[REQUEST_HEADERS.AUTHORIZATION]
    if (!accessToken)
      throw new BadRequestError(`${REQUEST_HEADERS.AUTHORIZATION} missing`)

    const foundUser = await userService.findById(userId)
    if (!foundUser) throw new UnAuthorizedError(`Invalid ${REQUEST_HEADERS.CLIENT_ID}`)

    try {
      const decodedUser = verifyToken(accessToken, foundKeyToken.publicKey)

      const match = userId === decodedUser.userId
      if (!match) throw new UnAuthorizedError('Invalid user id')

      req.keyToken = foundKeyToken
      return next()
    } catch (error) {
      const isExpiredToken = error.name === 'TokenExpiredError'
      if (isExpiredToken) {
        throw new UnAuthorizedError(`Expired ${REQUEST_HEADERS.AUTHORIZATION}`)
      }
      throw new UnAuthorizedError(`Invalid ${REQUEST_HEADERS.AUTHORIZATION}`)
    }
  }
}

module.exports = new AuthMiddleware()
