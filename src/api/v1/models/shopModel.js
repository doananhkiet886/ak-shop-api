'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'shops'
const DOCUMENT_NAME = 'shop'

const shopSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  roles: { type: Array, default: [] }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, shopSchema)