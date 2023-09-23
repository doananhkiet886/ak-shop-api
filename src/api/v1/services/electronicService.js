const electronicModel = require('../models/electronicModel')
const ProductService = require('./productService')
const { BadRequestError } = require('../../../core/errorResponse')

class ElectronicService extends ProductService {

  async createProduct() {
    const newElectronic = await electronicModel.create({ ...this.attributes, shop: this.shop })
    if (!newElectronic) throw new BadRequestError('Create electronic failure')

    const newProduct = await super.createProduct(newElectronic._id)
    if (!newProduct) throw new BadRequestError('Create product failure')

    return newProduct
  }
}

module.exports = ElectronicService