'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'carts'
const DOCUMENT_NAME = 'cart'


/**
 * products = [
 *  {
 *    productId,
 *    name,
 *    quantity,
 *    price
 *    shopId,
 *  }
 * ]
 */

const cartSchema = new Schema({
  state: {
    type: String,
    enum: ['active', 'completed', 'failed', 'pending'],
    required: true
  },
  products: [{
    _id: false,
    shopId: { type: Schema.ObjectId, ref: 'shop', required: true },
    productId: { type: Schema.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true }
  }],
  countProducts: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.ObjectId,
    required: true,
    ref: 'user'
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, cartSchema)
