'use strict'

const userModel = require('../models/userModel')

class UserService {
  static async findByUsername(username = '') {
    return await userModel.findOne({ 'account.username': username }).lean()
  }

  static async findById(id = '') {
    return await userModel.findById(id).lean()
  }

  static async createUser(requestBody = {}) {
    const {
      lastName, firstName, gender,
      dateOfBirth, address, phoneNumber,
      email, username, password
    } = requestBody

    return await userModel.create({
      lastName, firstName, gender, dateOfBirth,
      address, phoneNumber, email, account: { username, password }
    })
  }
}

module.exports = UserService
