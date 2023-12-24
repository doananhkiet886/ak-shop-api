'use strict'

const inventoryModel = require('../inventoryModel')

const insertInventory = async ({ shop, product, location, stock }) => {
  return await inventoryModel.create({ shop, product, location, stock })
}

const findInventoryByProductId = async (productId) => {
  return await inventoryModel.findOne({ product: productId })
}

module.exports = {
  insertInventory,
  findInventoryByProductId
}