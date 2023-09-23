'use strict'

const { CreatedResponse } = require('../../../core/successResponse')
const ProductFactory = require('../services/product.factory')

class ProductController {
  // [POST] /api/v1//products
  async createProduct(req, res) {
    const type = req.body.type
    const payload = req.body

    new CreatedResponse({
      message: 'Create product successfully',
      metadata: await ProductFactory.createProduct({ type, payload })
    }).send(res)
  }
}

module.exports = new ProductController()
