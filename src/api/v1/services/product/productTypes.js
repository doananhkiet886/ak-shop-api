'use strict'

const ElectronicService = require('./electronicService')
const ClothingService = require('./clothingService')

module.exports = [
  { type: 'Electronic', productClass: ElectronicService },
  { type: 'Clothing', productClass: ClothingService }
]
