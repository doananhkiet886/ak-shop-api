'use strict'

const productModel = require('../models/productModel')

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

module.exports = ProductService