const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'electronics'
const DOCUMENT_NAME = 'electronic'

const electronicSchema = new Schema({
  manufacture: { type: String, required: true },
  model: { type: String, default: null },
  color: { type: String, default: null },
  shop: { type: Schema.Types.ObjectId, required: true, ref: 'shop' }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, electronicSchema)