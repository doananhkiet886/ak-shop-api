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
}

module.exports = new KeyTokenService()
