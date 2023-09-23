const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'users'
const DOCUMENT_NAME = 'user'

const userSchema = new Schema({
  lastName: {
    type: String,
    maxLength: 50,
    required: true,
    index: true
  },
  firstName: {
    type: String,
    maxLength: 30,
    required: true,
    index: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', null],
    default: null
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  address: {
    type: String,
    maxLength: 200,
    default: null
  },
  phoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 11,
    default: null
  },
  email: {
    type: String,
    maxLength: 50,
    default: null
  },
  account: {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive'
    },
    verify: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: []
    }
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, userSchema)