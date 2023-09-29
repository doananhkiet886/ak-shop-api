'use strict'

const { CreatedResponse, SuccessResponse } = require('../../../core/successResponse')
const productFactory = require('../services/product')
const { createFilterObjectFromQueryObject } = require('../helpers/mongooseHelper')
const requestHeaders = require('../utils/requestHeadersUtil')
const { BadRequestError } = require('../../../core/errorResponse')
class ProductController {
  // [POST] /api/v1/products
  async createProduct(req, res) {
    const shopId = req.headers[requestHeaders.SHOP_ID]
    const type = req.body.type
    const payload = req.body
    if (!shopId || !type) new BadRequestError(`${requestHeaders.SHOP_ID} or Type missing`)

    new CreatedResponse({
      message: 'Create product successfully',
      metadata: await productFactory.createProduct(shopId, type, payload)
    }).send(res)
  }

  // [GET] /api/v1/products/draft/all
  async getAllDraftProductsForShop(req, res) {
    const shopId = req.headers[requestHeaders.SHOP_ID]
    if (!shopId) new BadRequestError(`${requestHeaders.SHOP_ID} missing`)

    const { filter, selector, pagination, sorter } = req
    const options = { filter, selector, pagination, sorter }

    new SuccessResponse({
      message: 'Get all draft product successfully',
      metadata: await productFactory.findAllDraftProductsForShop(shopId, options)
    }).send(res)
  }

  // [GET] /api/v1/products/published/all
  async getAllPublishedProductsForShop(req, res) {
    const shopId = req.headers[requestHeaders.SHOP_ID]
    if (!shopId) new BadRequestError(`${requestHeaders.SHOP_ID} missing`)

    const { filter, selector, pagination, sorter } = req
    const options = { filter, selector, pagination, sorter }

    new SuccessResponse({
      message: 'Get all published product successfully',
      metadata: await productFactory.findAllPublishedProductsForShop(shopId, options)
    }).send(res)
  }

  // [POST] /api/v1/products/publish/:id
  async publishProductForShop(req, res) {
    const shopId = req.headers[requestHeaders.SHOP_ID]
    const productId = req.params.id
    if (!shopId || !productId) new BadRequestError(`${requestHeaders.SHOP_ID} or Product ID missing`)

    new SuccessResponse({
      message: 'Publish product successfully',
      metadata: await productFactory.publishProductForShop(productId, shopId)
    }).send(res)
  }

  // [POST] /api/v1/products/unpublish/:id
  async unpublishProductForShop(req, res) {
    const shopId = req.headers[requestHeaders.SHOP_ID]
    const productId = req.params.id
    if (!shopId || !productId) new BadRequestError(`${requestHeaders.SHOP_ID} or Product ID missing`)

    new SuccessResponse({
      message: 'Unpublish product successfully',
      metadata: await productFactory.unpublishProductForShop(productId, shopId)
    }).send(res)
  }

  // [PATCH] /api/v1/products//:id?type=
  async updateProduct(req, res) {
    const productId = req.params.id
    const type = req.query.type
    const shopId = req.headers[requestHeaders.SHOP_ID]
    const payload = req.body
    if (!shopId || !type) throw new BadRequestError('Shop ID or Type missing')

    new SuccessResponse({
      message: 'Update product successfully',
      metadata: await productFactory.updateProduct(
        type, productId, shopId, payload
      )
    }).send(res)
  }

  // [GET] /api/v1/products/search/:keyword
  async searchProductForBuyer(req, res) {
    const { keyword } = req.params
    const { filter, selector, pagination } = req
    const options = { filter, selector, pagination }

    new SuccessResponse({
      message: 'Search product successfully',
      metadata: await productFactory.searchProductForBuyer(keyword, options)
    }).send(res)
  }


  // [GET] /api/v1/products
  async getAllProductsForBuyer(req, res) {
    const { filter, selector, pagination, sorter } = req
    const options = { filter, selector, pagination, sorter }

    new SuccessResponse({
      message: 'Get all products successfully',
      metadata: await productFactory.findAllProductsForBuyer(options)
    }).send(res)
  }

  // [GET] /api/v1/products/:id
  async getProductForBuyer(req, res) {
    const { id } = req.params
    const { _select } = req.query

    new SuccessResponse({
      message: 'Get product successfully',
      metadata: await productFactory.findProductForBuyer(id, _select)
    }).send(res)
  }
}

module.exports = new ProductController()
