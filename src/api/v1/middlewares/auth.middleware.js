'use strict'

const apiKeyService = require('../services/apiKey.service')
const { ForbiddenError, UnAuthorizedError } = require('../../../core/errorResponse')

const HEADERS = {
  API_KEY: 'x-api-key'
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
}

module.exports = new AuthMiddleware()
