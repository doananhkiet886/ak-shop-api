'use strict'

const discountService = require('../services/discountService')
const { CreatedResponse, SuccessResponse, OkResponse } = require('../../../core/successResponse')
const REQUEST_HEADERS = require('../utils/requestHeadersUtil')

class ShopController {
  // [POST] /api/v1/discounts
  async createDiscount(req, res) {
    const shopId = req.headers[REQUEST_HEADERS.SHOP_ID]
    const payload = { ...req.body, shopId }

    new CreatedResponse({
      message: 'Create discount successfully',
      metadata: await discountService.createDiscount(payload)
    }).send(res)
  }

  // [PATCH] /api/v1/discounts/:id
  async updateDiscount(req, res) {
    const shopId = req.headers[REQUEST_HEADERS.SHOP_ID]
    const discountId = req.params.id

    new SuccessResponse({
      message: 'Update shop successfully',
      metadata: await discountService.updateDiscount(discountId, shopId, req.body)
    }).send(res)
  }

  // [GET] /api/v1/discounts/get_all_products/?code=
  async getAllProductsByCodeForBuyer(req, res) {
    const { filter, selector, pagination, sorter } = req
    const discountCode = req.query.code
    delete filter.code

    new OkResponse({
      message: 'Get all products by code successfully',
      metadata: await discountService.findAllProductsByDiscountCodeForBuyer(discountCode, {
        filter, selector, pagination, sorter
      })
    }).send(res)
  }

  // [GET] /api/v1/discounts/discount-amount
  async getDiscountAmount(req, res) {
    const { code, products } = req.body

    new OkResponse({
      message: 'Get discount amount successfully',
      metadata: await discountService.getDiscountAmount(code, products)
    }).send(res)
  }
}

module.exports = new ShopController()
