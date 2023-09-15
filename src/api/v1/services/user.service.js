'use strict'

const userModel = require('../models/user.model')

class UserService {
  async findByUsername(username = '') {
    return await userModel.findOne({ 'account.username': username }).lean()
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
