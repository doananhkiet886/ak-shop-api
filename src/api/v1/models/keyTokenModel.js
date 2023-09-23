const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'KeyToken'
const MODEL_NAME = 'keyTokenModel'

const keyTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  publicKey: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  refreshTokensUsed: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(MODEL_NAME, keyTokenSchema)
