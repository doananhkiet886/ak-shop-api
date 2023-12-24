'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'discounts'
const DOCUMENT_NAME = 'discount'

const discountSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, default: 'fixed amount' }, // percentage
  value: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  maxUses: { type: Number, required: true },
  usesCount: { type: Number, default: 0 },
  userUsed: { type: Array, default: [] },
  maxUsesPerUser: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  shop: { type: Schema.Types.ObjectId, required: true, ref: 'shop' },
  isActive: { type: Boolean, default: true },
  appliesTo: { type: String, required: true, enum: ['all', 'specific'] },
  productIds: { type: Array, default: [] }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, discountSchema)
