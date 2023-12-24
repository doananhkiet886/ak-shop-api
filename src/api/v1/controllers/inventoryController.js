'use strict'

const inventoryService = require('../services/inventoryService')
const { SuccessResponse } = require('../../../core/successResponse')

const requestHeaders = require('../utils/requestHeadersUtil')

class InventoryController {
  async addStock(req, res) {
    const userId = req.headers[requestHeaders.CLIENT_ID]
    const requestBody = { ...req.body }

    new SuccessResponse({
      message: 'Get checkout information successfully',
      metadata: await inventoryService.addStockToInventory(userId, requestBody)
    }).send(res)
  }
}

module.exports = new InventoryController()