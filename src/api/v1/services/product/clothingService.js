const clothingModel = require('../../models/product/clothingModel')
const ProductService = require('./productService')
const { findOneAndUpdateFewFields } = require('../../helpers/mongooseHelper')
const { BadRequestError } = require('../../../../core/errorResponse')
class ClothingService extends ProductService {
  async createProduct() {
    const newClothing = await clothingModel.create({
      ...this.attributes,
      shop: this.shopId
    })
    if (!newClothing) throw new BadRequestError('Create clothing failure')

    const newProduct = await super.createProduct(newClothing._id)
    if (!newProduct) throw new BadRequestError('Create product failure')

    return newProduct
  }

  async updateProduct(productId = '', shopId = '') {
    const payload = this.attributes

    if (payload) {
      await findOneAndUpdateFewFields({
        model: clothingModel,
        filter: {
          _id: productId,
          shop: shopId
        },
        payload
      })
    }

    const updatedProduct = await super.updateProduct(productId, shopId)
    return updatedProduct
  }
}

module.exports = ClothingService
