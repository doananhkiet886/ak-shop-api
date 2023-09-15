'use strict'

const apiKeyService = require('../services/apiKey.service')
const { ForbiddenError } = require('../../../core/errorResponse')

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
}

module.exports = new AuthMiddleware()
