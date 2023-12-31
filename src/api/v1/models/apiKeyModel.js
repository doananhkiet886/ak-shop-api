'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'apiKeys'
const DOCUMENT_NAME = 'apiKey'

const apiKeySchema = new Schema({
  key: { type: String, required: true, index: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  permissions: { type: [String], default: [] },
  expiresIn: { type: String, default: '3 days' }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, apiKeySchema)
