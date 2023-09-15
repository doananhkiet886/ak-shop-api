const { model, Schema, Types } = require('mongoose')

const COLLECTION_NAME = 'Shop'
const MODEL_NAME = 'shopModel'

const shopSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  name: {
    type: String,
    maxLength: 100
  },
  roles: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(MODEL_NAME, shopSchema)