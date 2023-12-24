'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'users'
const DOCUMENT_NAME = 'user'

const userSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', null], default: null },
  dateOfBirth: { type: Date, default: null },
  address: { type: String, default: null },
  phoneNumber: { type: String, default: null },
  email: { type: String, default: null },
  account: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    verify: { type: Boolean, default: false },
    roles: { type: Array, default: [] }
  }
}, {
  timestamps: true,
  versionKey: false,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, userSchema)