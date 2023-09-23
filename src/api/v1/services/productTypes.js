const ElectronicService = require('./electronic.service')
const ClothingService = require('./clothing.service')

const productTypes = [
  { type: 'Electronic', productClass: ElectronicService },
  { type: 'Clothing', productClass: ClothingService }
]

module.exports = productTypes