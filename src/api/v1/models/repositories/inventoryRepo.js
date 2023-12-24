'use strict'

const inventoryModel = require('../inventoryModel')

const insertInventory = async ({ shop, product, location, stock }) => {
  return await inventoryModel.create({ shop, product, location, stock })
}

const findInventoryByProductId = async (productId) => {
  return await inventoryModel.findOne({ product: productId })
}

const reservationInventory = async ({
  productId, quantity, cartId
}) => {
  const filter = {
    productId,
    stock: { $gte: quantity }
  }
  const updateSet = {
    $inc: { stock: -quantity },
    $push: { reservations: { quantity, cartId, createdAt: new Date() } }
  }
  const options = { upsert: true, new: true }

  return await inventoryModel.updateOne(filter, updateSet)
}

module.exports = {
  insertInventory,
  findInventoryByProductId,
  reservationInventory
}