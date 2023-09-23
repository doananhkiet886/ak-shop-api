const ElectronicService = require('./electronicService')
const ClothingService = require('./clothingService')

const productTypes = [
  { type: 'Electronic', productClass: ElectronicService },
  { type: 'Clothing', productClass: ClothingService }
]

module.exports = productTypes