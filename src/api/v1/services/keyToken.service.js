'use strict'

const { Types } = require('mongoose')
const keyTokenModel = require('../models/keyToken.model')

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
    return await keyTokenModel.findOne({ userId }).lean()
  }

  async updateKeyToken({
    filter = {},
    update = {}
  }) {
    return await keyTokenModel.updateOne(filter, update)
  }
}

module.exports = new KeyTokenService()
