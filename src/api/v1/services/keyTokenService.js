'use strict'

const { Types } = require('mongoose')
const keyTokenModel = require('../models/keyTokenModel')
const { MyError } = require('../../../core/errorResponse')

class KeyTokenService {
  static async createKeyToken(userId = '', publicKey, privateKey, refreshToken = '') {
    return await keyTokenModel.create({
      userId: new Types.ObjectId(userId),
      publicKey,
      privateKey,
      refreshToken
    })
  }

  static async findByUserId(userId = '') {
    try {
      return await keyTokenModel.findOne({ userId }).lean()
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  static async findByRefreshToken(refreshToken = '') {
    try {
      return await keyTokenModel.findOne({ refreshToken }).lean()
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  static async findByRefreshTokenUsed(refreshToken = '') {
    try {
      return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  static async updateKeyToken(filter = {}, update = {}) {
    return await keyTokenModel.updateOne(filter, update)
  }

  static async deleteById(id = '') {
    try {
      return await keyTokenModel.deleteOne({ _id: id })
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  static async deleteByUserId(userId = '') {
    try {
      return await keyTokenModel.deleteOne({ userId })
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }
}

module.exports = KeyTokenService
