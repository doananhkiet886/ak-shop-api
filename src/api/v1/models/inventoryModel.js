'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'inventories'
const DOCUMENT_NAME = 'inventory'

const inventorySchema = new Schema({
  shop: { type: Schema.Types.ObjectId, required: true, ref: 'shop' },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
  location: { type: String, default: 'unknown' },
  stock: { type: Number, min: 0, default: 0 },
  reservations: { type: Array, default: [] }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, inventorySchema)
