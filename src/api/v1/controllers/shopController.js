'use strict'

const shopService = require('../services/shopService')
const { CreatedResponse } = require('../../../core/successResponse')
const REQUEST_HEADERS = require('../utils/requestHeadersUtil')

class ShopController {
  async createShop(req, res) {
    const userId = req.headers[REQUEST_HEADERS.CLIENT_ID]
    const { name } = req.body

    new CreatedResponse({
      message: 'Create shop successfully',
      metadata: await shopService.createShop(userId, name)
    }).send(res)
  }
}

module.exports = new ShopController()
