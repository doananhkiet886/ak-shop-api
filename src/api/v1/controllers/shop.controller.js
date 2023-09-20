'use strict'

const shopService = require('../services/shop.service')
const { CreatedResponse } = require('../../../core/successResponse')

class ShopController {
  async createShop(req, res) {
    new CreatedResponse({
      message: 'Create shop successfully',
      metadata: await shopService.createShop(req.body)
    }).send(res)
  }
}

module.exports = new ShopController()
