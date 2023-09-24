const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'keyTokens'
const DOCUMENT_NAME = 'keyToken'

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
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)
