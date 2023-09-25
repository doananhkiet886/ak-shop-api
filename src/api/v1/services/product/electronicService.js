const electronicModel = require('../../models/product/electronicModel')
const ProductService = require('./productService')
const { findOneAndUpdateFewFields } = require('../../helpers/mongooseHelper')
const { BadRequestError } = require('../../../../core/errorResponse')
class ElectronicService extends ProductService {
  async createProduct() {
    const newElectronic = await electronicModel.create({ ...this.attributes, shop: this.shop })
    if (!newElectronic) throw new BadRequestError('Create electronic failure')

    const newProduct = await super.createProduct(newElectronic._id)
    if (!newProduct) throw new BadRequestError('Create product failure')

    return newProduct
  }

  async updateProduct({ productId = '', shopId = '' }) {
    let payload = this.attributes

    if (payload) {
      await findOneAndUpdateFewFields({
        model: electronicModel,
        filter: {
          _id: productId,
          shop: shopId
        },
        payload
      })
    }

    const updatedProduct = await super.updateProduct({
      productId, shopId
    })
    return updatedProduct
  }
}

module.exports = ElectronicService