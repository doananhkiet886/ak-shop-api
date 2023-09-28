'use strict'

const productModel = require('../../models/product/productModel')
const { findOneAndUpdateFewFields } = require('../../helpers/mongooseHelper')

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

  async createProduct(shopId = '', productId = '') {
    return await productModel.create({
      ...this,
      _id: productId,
      shop: shopId
    })
  }

  async updateProduct(productId = '', shopId = '') {
    const filter = {
      _id: productId,
      shop: shopId
    }
    const payload = this

    return await findOneAndUpdateFewFields(productModel, filter, payload)
  }
}

module.exports = ProductService