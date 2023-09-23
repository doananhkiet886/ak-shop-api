'use strict'

const { BadRequestError } = require('../../../core/errorResponse')
const { CreatedResponse, OkResponse } = require('../../../core/successResponse')
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
   * @route [GET] /api/v1/products
   * @param { Number } skip
   * @param { Number } limit
   * @returns { JSON }
   */
  async getAllDraftProductsByShopId(req, res) {
    const { shopId } = req.body
    if (!shopId) return new BadRequestError('Invalid shopId')

    new OkResponse({
      metadata: await ProductFactory.findAllDraftProductsByShopId({ shopId })
    }).send(res)
  }
}

module.exports = new ProductController()
