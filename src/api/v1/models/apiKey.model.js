const { model, Schema, Types } = require('mongoose')

const COLLECTION_NAME = 'ApiKey'
const MODEL_NAME = 'apiKeyModel'

const apiKeySchema = new Schema({
  key: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  permissions: {
    type: [String],
    default: []
  },
  expiresIn: {
    type: String,
    default: '3 days'
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(MODEL_NAME, apiKeySchema)
