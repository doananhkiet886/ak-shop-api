'use strict'

const { CreatedResponse, SuccessResponse } = require('../../../core/successResponse')
const productFactory = require('../services/product')
const { createFilterObjectFromQueryObject } = require('../helpers/mongooseHelper')

class ProductController {
  /**
   * @desc create product
   * @route [POST] /api/v1/products
   * @param { Number } skip
   * @param { Number } limit
   * @returns { JSON }
   */
  async createProduct(req, res) {
    const type = req.body.type
    const payload = req.body

    new CreatedResponse({
      message: 'Create product successfully',
      metadata: await productFactory.createProduct({ type, payload })
    }).send(res)
  }

  /**
   * @desc get all draft products by shopId
   * @route [GET] /api/v1/products/draft/all
   * @param { Number } skip
   * @param { Number } limit
   * @returns { JSON }
   */
  async getAllDraftProductsForShop(req, res) {
    const { shopId } = req.body

    new SuccessResponse({
      message: 'Get all draft product successfully',
      metadata: await productFactory.findAllDraftProductsForShop({ shopId })
    }).send(res)
  }

  /**
   * @desc get all published products by shopId
   * @route [GET] /api/v1/products/published/all
   * @param { Number } skip
   * @param { Number } limit
   * @returns { JSON }
   */
  async getAllPublishedProductsForShop(req, res) {
    const { shopId } = req.body

    new SuccessResponse({
      message: 'Get all published product successfully',
      metadata: await productFactory.findAllPublishedProductsForShop({ shopId })
    }).send(res)
  }

  /**
   * @desc publish product by shopId
   * @route [POST] /api/v1/products/publish/:id
   * @param { String } productId
   * @param { String } shopId
   * @returns { JSON }
   */
  async publishProductForShop(req, res) {
    const { shopId } = req.body
    const productId = req.params.id

    new SuccessResponse({
      message: 'Publish product successfully',
      metadata: await productFactory.publishProductForShop({ productId, shopId })
    }).send(res)
  }

  /**
   * @desc unpublish product by shopId
   * @route [POST] /api/v1/products/unpublish/:id
   * @param { String } productId
   * @param { String } shopId
   * @returns { JSON }
   */
  async unpublishProductForShop(req, res) {
    const { shopId } = req.body
    const productId = req.params.id

    new SuccessResponse({
      message: 'Publish product successfully',
      metadata: await productFactory.unpublishProductForShop({ productId, shopId })
    }).send(res)
  }

  async updateProduct(req, res) {
    const productId = req.params.id
    const { shopId, type } = req.query
    const payload = req.body

    new SuccessResponse({
      message: 'Update product successfully',
      metadata: await productFactory.updateProduct({
        type, productId, shopId, payload
      })
    }).send(res)
  }

  /**
   * @desc search product for buyer
   * @route [GET] /api/v1/products/search/:keyword
   * @param { String } keyword
   * @returns { JSON }
  */
  async searchProductForBuyer(req, res) {
    const { keyword } = req.params

    new SuccessResponse({
      message: 'Search product successfully',
      metadata: await productFactory.searchProductForBuyer({ keyword })
    }).send(res)
  }

  /**
   * @desc get all products for buyer
   * @route [GET] /api/v1/products?<filter_field>=&_limit=&_page=&_sort=&_select=
   * @param { String } <filter_field>
   * @param { Object } filter from <filter_fields>
   * @param { Number } _limit
   * @param { Number } _page
   * @param { String } _sort
   * @param { String } _select
   * @returns { JSON }
 */
  async getAllProductsForBuyer(req, res) {
    const { _limit, _page, _sort, _select } = req.query
    const filter = createFilterObjectFromQueryObject({ queryObject: req.query })

    new SuccessResponse({
      message: 'Get all products successfully',
      metadata: await productFactory.findAllProductsForBuyer({
        filter, limit: _limit, page: _page, sort:_sort, select: _select
      })
    }).send(res)
  }

  /**
   * @desc get product for buyer
   * @route [GET] /api/v1/products/:id?_select=
   * @param { String } id
   * @param { String } _select
   * @returns { JSON }
 */
  async getProductForBuyer(req, res) {
    const { id } = req.params
    const { _select } = req.query

    new SuccessResponse({
      message: 'Get product successfully',
      metadata: await productFactory.findProductForBuyer({
        productId: id,
        select: _select
      })
    }).send(res)
  }
}

module.exports = new ProductController()
