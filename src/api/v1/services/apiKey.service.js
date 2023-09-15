'use strict'

const crypto = require('crypto')
const apiKeyModel = require('../models/apiKey.model')

class ApiKeyService {
  async findByKey(key = '') {
    // await apiKeyModel.create({
    //   key: crypto.randomBytes(64).toString('hex'),
    //   permissions: ['0000'],
    //   expiresIn: '30 days'
    // })

    return await apiKeyModel.findOne({ key }).lean()
  }
}

module.exports = new ApiKeyService()
