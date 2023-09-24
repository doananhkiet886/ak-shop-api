const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const COLLECTION_NAME = 'products'
const DOCUMENT_NAME = 'product'

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
    enum: ['Electronic', 'Clothing', 'Furniture']
  },
  shop: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'shop'
  },
  slug: {
    type: String
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1'],
    max: [5, 'Rating must be below 5'],
    set: val => Math.round(val * 10) / 10
  },
  variations: {
    type: Array,
    default: []
  },
  attributes: {
    type: Schema.Types.Mixed,
    required: true
  },
  isDraft: {
    type: Boolean,
    default: true,
    select: false
  },
  isPublished: {
    type: Boolean,
    default: false,
    select: false
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

productSchema.index({ name: 'text', description: 'text' })

productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true, trim: true })
  next()
})

module.exports = model(DOCUMENT_NAME, productSchema)
