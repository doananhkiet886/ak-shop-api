'use strict'

const { Types } = require('mongoose')
const keyTokenModel = require('../models/keyToken.model')
const { MyError } = require('../../../core/errorResponse')

class KeyTokenService {
  async createKeyToken({ userId = '', publicKey, privateKey, refreshToken }) {
    return await keyTokenModel.create({
      userId: new Types.ObjectId(userId),
      publicKey,
      privateKey,
      refreshToken
    })
  }

  async findByUserId(userId = '') {
    try {
      return await keyTokenModel.findOne({ userId }).lean()
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  async findByRefreshToken(refreshToken = '') {
    try {
      return await keyTokenModel.findOne({ refreshToken }).lean()
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  async findByRefreshTokenUsed(refreshToken = '') {
    try {
      return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  async updateKeyToken({
    filter = {},
    update = {}
  }) {
    return await keyTokenModel.updateOne(filter, update)
  }

  async deleteById(id = '') {
    try {
      return await keyTokenModel.deleteOne({ _id: id })
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }

  async deleteByUserId(userId = '') {
    try {
      return await keyTokenModel.deleteOne({ userId })
    } catch (error) {
      throw new MyError(error.message, 500)
    }
  }
}

module.exports = new KeyTokenService()
