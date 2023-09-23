'use strict'

const userModel = require('../models/userModel')

class UserService {
  async findByUsername(username = '') {
    return await userModel.findOne({ 'account.username': username }).lean()
  }

  async findById(id = '') {
    return await userModel.findById(id).lean()
  }

  async createUser({
    lastName,
    firstName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    email,
    username,
    password
  }) {
    return await userModel.create({
      lastName,
      firstName,
      gender,
      dateOfBirth,
      address,
      phoneNumber,
      email,
      account: {
        username,
        password
      }
    })
  }
}

module.exports = new UserService()
