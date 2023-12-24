'use strict'

const checkoutService = require('../services/checkoutService')
const { SuccessResponse } = require('../../../core/successResponse')

const requestHeaders = require('../utils/requestHeadersUtil')

class CheckoutController {
  async checkoutReview(req, res) {
    const userId = req.headers[requestHeaders.CLIENT_ID]
    const requestBody = { ...req.body }

    new SuccessResponse({
      message: 'Get checkout information successfully',
      metadata: await checkoutService.checkoutReview(userId, requestBody)
    }).send(res)
  }
}

module.exports = new CheckoutController()