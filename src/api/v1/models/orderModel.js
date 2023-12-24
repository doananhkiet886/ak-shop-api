'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'orders'
const DOCUMENT_NAME = 'order'


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

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  checkout: { type: Object, default: {} }, // totalPayment
  shipping: { type: Object, default: {} },
  /*
    street
    city
    country
    state
  */
  payment: { type: Object, default: {} },
  products: { type: Array, required: true }, // newShopOrderIds
  trackingNumber: { type: String, default: '#0000118052022' },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered','cancelled'], default: 'pending' }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, orderSchema)
