'use strict'

const productModel = require('../../models/product/productModel')
const inventoryRepo = require('../../models/repositories/inventoryRepo')
const { findOneAndUpdateFewFields } = require('../../helpers/mongooseHelper')

class ProductService {

  constructor({
    name, thumb, description, price,
    quantity, type, shopId, attributes
  }) {
    this.name = name
    this.thumb = thumb
    this.description = description
    this.price = price
    this.quantity = quantity
    this.type = type
    this.shopId = shopId
    this.attributes = attributes
  }

  async createProduct(productId = '') {
    const newProduct = await productModel.create({
      ...this,
      shop: this.shopId,
      _id: productId
    })
    if (newProduct) {
      await inventoryRepo.insertInventory({
        shop: this.shopId,
        product: newProduct._id,
        stock: this.quantity
      })
    }
    return newProduct
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