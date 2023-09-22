'use strict'

const { productModel, electronicModel, clothingModel } = require('../models/product.model')
const { BadRequestError } = require('../../../core/errorResponse')

class ProductFactory {

  async createProduct({ type, payload }) {
    switch (type) {
    case 'Electronic':
      return await new ElectronicService(payload).createProduct()
    case 'Clothing':
      return await new ClothingService(payload).createProduct()
    default:
      throw new BadRequestError('Invalid type')
    }
  }
}

class ProductService {

  constructor({
    name, thumb, description, price,
    quantity, type, shop, attributes
  }) {
    this.name = name
    this.thumb = thumb
    this.description = description
    this.price = price
    this.quantity = quantity
    this.type = type
    this.shop = shop
    this.attributes = attributes
  }

  async createProduct(productId = '') {
    return await productModel.create({ ...this, _id: productId })
  }
}

class ClothingService extends ProductService {

  async createProduct() {
    const newClothing = await clothingModel.create({ ...this.attributes, shop: this.shop })
    if (!newClothing) throw new BadRequestError('Create clothing failure')

    const newProduct = await super.createProduct(newClothing._id)
    if (!newProduct) throw new BadRequestError('Create product failure')

    return newProduct
  }
}

class ElectronicService extends ProductService {

  async createProduct() {
    const newElectronic = await electronicModel.create({ ...this.attributes, shop: this.shop })
    if (!newElectronic) throw new BadRequestError('Create electronic failure')

    const newProduct = await super.createProduct(newElectronic._id)
    if (!newProduct) throw new BadRequestError('Create product failure')

    return newProduct
  }
}

module.exports = new ProductFactory()