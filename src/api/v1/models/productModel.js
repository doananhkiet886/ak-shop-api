const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'products'
const DOCUMENT_NAME = 'product'

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  thumb: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Furniture']
  },
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  },
  attributes: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, productSchema)
