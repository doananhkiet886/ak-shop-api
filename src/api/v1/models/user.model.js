const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'User'
const MODEL_NAME = 'userModel'

const userSchema = new Schema({
  lastName: {
    type: String,
    maxLength: 50,
    required: true
  },
  firstName: {
    type: String,
    maxLength: 30,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  dateOfBirth: {
    type: Date
  },
  address: {
    type: String,
    maxLength: 200
  },
  phoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 11
  },
  email: {
    type: String,
    maxLength: 50
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

module.exports = model(MODEL_NAME, userSchema)