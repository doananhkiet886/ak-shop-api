const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'clothes'
const DOCUMENT_NAME = 'clothing'

const clothingSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  size: {
    type: String
  },
  material: {
    type: String
  },
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, clothingSchema)