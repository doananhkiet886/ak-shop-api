'use strict'

const { BadRequestError } = require('../../../core/errorResponse')
const { CreatedResponse, OkResponse, SuccessResponse } = require('../../../core/successResponse')
const ProductFactory = require('../services/productFactory')

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
      metadata: await ProductFactory.createProduct({ type, payload })
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
      metadata: await ProductFactory.findAllDraftProductsForShop({ shopId })
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
      metadata: await ProductFactory.findAllPublishedProductsForShop({ shopId })
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
      message: 'publish product successfully',
      metadata: await ProductFactory.publishProductForShop({ productId, shopId })
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
      message: 'publish product successfully',
      metadata: await ProductFactory.unpublishProductForShop({ productId, shopId })
    }).send(res)
  }
}

module.exports = new ProductController()
