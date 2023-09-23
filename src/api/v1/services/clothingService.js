const clothingModel = require('../models/clothingModel')
const ProductService = require('./productService')
const { BadRequestError } = require('../../../core/errorResponse')

class ClothingService extends ProductService {

  async createProduct() {
    const newClothing = await clothingModel.create({ ...this.attributes, shop: this.shop })
    if (!newClothing) throw new BadRequestError('Create clothing failure')

    const newProduct = await super.createProduct(newClothing._id)
    if (!newProduct) throw new BadRequestError('Create product failure')

    return newProduct
  }
}

module.exports = ClothingService