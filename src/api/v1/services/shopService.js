'use strict'

const { Types } = require('mongoose')
const shopModel = require('../models/shopModel')
const userService = require('./userService')
const { NotFoundError, InternalServerError } = require('../../../core/errorResponse')

class ShopService {
  async createShop({ userId = '', name = '' }) {
    console.log({ userId })
    const foundUser = await userService.findById(userId)
    if (!foundUser) throw new NotFoundError('Invalid user id')

    const newShop = await shopModel.create({
      userId: new Types.ObjectId(userId),
      name: name,
      roles: ['0000']
    })
    if (!newShop) throw new InternalServerError('Create shop failure')

    return {
      shop: newShop
    }
  }
}

module.exports = new ShopService()
