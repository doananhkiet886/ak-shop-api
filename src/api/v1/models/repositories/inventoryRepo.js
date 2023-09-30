'use strict'

const inventoryModel = require('../inventoryModel')

const insertInventory = async ({ shop, product, location, stock }) => {
  return await inventoryModel.create({ shop, product, location, stock })
}

module.exports = {
  insertInventory
}