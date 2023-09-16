'use strict'

const { Types } = require('mongoose')
const userModel = require('../models/user.model')
const { MyError } = require('../../../core/errorResponse')

class UserService {
  async findByUsername(username = '') {
    return await userModel.findOne({ 'account.username': username }).lean()
  }

  async findById(id = '') {
    try {
      return await userModel.findById(id).lean()
    } catch (error) {
      throw new MyError(error.message, 500)
    }
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
