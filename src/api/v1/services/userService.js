'use strict'

const userModel = require('../models/userModel')
const cartService = require('../services/cartService')


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

    const newUser = await userModel.create({
      lastName, firstName, gender, dateOfBirth,
      address, phoneNumber, email, account: { username, password }
    })

    cartService.createCart(newUser._id)

    return newUser
  }
}

module.exports = UserService
