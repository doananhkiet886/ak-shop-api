'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'clothes'
const DOCUMENT_NAME = 'clothing'

const clothingSchema = new Schema({
  brand: { type: String, required: true },
  size: { type: String, default: null },
  material: { type: String, default: null },
  shop: { type: Schema.Types.ObjectId, required: true, ref: 'shop' }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, clothingSchema)