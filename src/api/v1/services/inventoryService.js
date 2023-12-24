'use strict'

const inventoryModel = require('../models/inventoryModel')
const productRepo = require('../models/repositories/productRepo')
const { BadRequestError } = require('../../../core/errorResponse')

class InventoryService {
  static async addStockToInventory({
    stock,
    productId,
    shopId,
    location = '134, Tran Phu, HCM city'
  }) {
    const product = await productRepo.findProductById(productId)
    if (!product) throw new BadRequestError('The product does not exists')
  
    const filter = { shopId, productId }
    const updateSet = {
      $inc: { stock: stock },
      $set: { location }
    }
    const options = { upsert: true, new: true }

    return await inventoryModel.findOneAndUpdate(filter, updateSet, options)
  }
}

module.exports = InventoryService