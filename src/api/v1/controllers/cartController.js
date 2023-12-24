'use strict'

const cartService = require('../services/cartService')
const requestHeaders = require('../utils/requestHeadersUtil')
const { SuccessResponse, OkResponse } = require('../../../core/successResponse')

class CartController {
  async addProductToCartForBuyer(req, res) {
    const userId = req.headers[requestHeaders.CLIENT_ID]
    const productAdded = { ...req.body }

    new SuccessResponse({
      message: 'Add product to cart successfully',
      metadata: await cartService.addProductToCartForBuyer(userId, productAdded)
    }).send(res)
  }

  async updateProductForBuyer(req, res) {
    const userId = req.headers[requestHeaders.CLIENT_ID]
    const product = { ...req.body }

    new SuccessResponse({
      message: 'Update product successfully',
      metadata: await cartService.updateProductForBuyer(userId, product)
    }).send(res)
  }

  async getCartByUserIdForBuyer(req, res) {
    const userId = req.headers[requestHeaders.CLIENT_ID]

    new OkResponse({
      message: 'Get cart successfully',
      metadata: await cartService.findCartByUserIdForBuyer(userId)
    }).send(res)
  }

  async deleteProductForBuyer(req, res) {
    const userId = req.headers[requestHeaders.CLIENT_ID]
    const productId = req.query.id

    new SuccessResponse({
      message: 'Update product successfully',
      metadata: await cartService.deleteProductForBuyer(userId, productId)
    }).send(res)
  }
}

module.exports = new CartController()