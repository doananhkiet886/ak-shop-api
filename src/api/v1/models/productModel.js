const { model, Schema } = require('mongoose')

const PRODUCT_COLLECTION_NAME = 'Product'
const PRODUCT_MODEL_NAME = 'productModel'

const CLOTHING_COLLECTION_NAME = 'Clothing'
const CLOTHING_MODEL_NAME = 'clothingModel'

const ELECTRONIC_COLLECTION_NAME = 'Electronic'
const ELECTRONIC_MODEL_NAME = 'electronicModel'

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  thumb: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Furniture']
  },
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  },
  attributes: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true,
  collection: PRODUCT_COLLECTION_NAME
})

const clothingSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  size: {
    type: String
  },
  material: {
    type: String
  },
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  }
}, {
  timestamps: true,
  collection: CLOTHING_COLLECTION_NAME
})

const electronicSchema = new Schema({
  manufacture: {
    type: String,
    required: true
  },
  model: {
    type: String
  },
  color: {
    type: String
  },
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  }
}, {
  timestamps: true,
  collection: ELECTRONIC_COLLECTION_NAME
})

module.exports = {
  productModel: model(PRODUCT_MODEL_NAME, productSchema),
  clothingModel: model(CLOTHING_MODEL_NAME, clothingSchema),
  electronicModel: model(ELECTRONIC_MODEL_NAME, electronicSchema)
}
