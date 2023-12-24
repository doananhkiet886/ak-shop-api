'use strict'

const discountModel = require('../models/discountModel')
const discountRepo = require('./../models/repositories/discountRepo')
const productRepo = require('./../models/repositories/productRepo')
const { findOneAndUpdateFewFields } = require('../helpers/mongooseHelper')
const {
  BadRequestError, NotFoundError, InternalServerError
} = require('../../../core/errorResponse')

class DiscountService {
  static async createDiscount({
    name, description, type, value,
    code, startDate, endDate, maxUses,
    usesCount, maxUsesPerUser, minOrderValue,
    shopId, isActive, appliesTo, productIds
  }) {

    if (new Date() > new Date(endDate)) {
      throw new BadRequestError('Discount code has expired')
    }
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestError('Start date must be before end date')
    }

    const foundDiscount = await discountModel.findOne({
      code, shop: shopId
    }).lean()
    if (foundDiscount) {
      throw new BadRequestError('Discount exists')
    }

    const newDiscount = await discountModel.create({
      name,
      description,
      type,
      value,
      code,
      startDate,
      endDate,
      maxUses,
      usesCount,
      maxUsesPerUser,
      minOrderValue,
      shop: shopId,
      isActive,
      appliesTo,
      productIds
    })

    return newDiscount
  }

  static async updateDiscount(discountId, shopId, payload = {}) {
    const filter = { _id: discountId, shop: shopId }

    const updatedDiscount = await findOneAndUpdateFewFields(discountModel, filter, payload)
    return updatedDiscount
  }

  static async deleteDiscount(discountId, shopId) {

  }

  static async cancelUseDiscountByCode(code) {

  }

  static async findAllProductsByDiscountCodeForBuyer(discountCode = '', {
    filter, selector, pagination, sorter
  }) {
    const foundDiscount = await discountRepo.findActiveDiscountByCode(discountCode)
    if (!foundDiscount) throw new BadRequestError('Discount is not exists')

    const { isActive, appliesTo, productIds, shop } = foundDiscount

    if (!isActive) throw new BadRequestError('Discount disabled')

    if (appliesTo === 'all') {
      filter.shop = shop
      return await productRepo.findAllProductsForBuyer({ filter, selector, pagination, sorter })
    }

    if (appliesTo === 'specific') {
      filter.shop = shop
      filter._id = {
        $in: productIds
      }
      return await productRepo.findAllProductsForBuyer({ filter, selector, pagination, sorter })
    }
  }

  static async getDiscountAmount(code, products) {
    const foundDiscount = await discountRepo.findDiscountByCode(code)
    if (!foundDiscount) throw new NotFoundError('Discount code is doesn\'t exist')

    const {
      isActive,
      maxUses,
      usesCount,
      startDate,
      endDate,
      minOrderValue,
      type,
      value,
      appliesTo,
      productIds
    } = foundDiscount

    if (!isActive) throw new NotFoundError('Discount code has expired')
    if (usesCount === maxUses) throw new NotFoundError('Discount code is out')

    const now = new Date()
    if (now < new Date(startDate) || now > new Date(endDate)) {
      throw new NotFoundError('Discount code has expired')
    }

    let totalPriceDiscountedProducts = 0
    switch (appliesTo) {
    case 'all':
      totalPriceDiscountedProducts = products.reduce((acc, { quality, price }) => {
        return acc + quality * price
      }, 0)
      break
    case 'specific':
      totalPriceDiscountedProducts = products.reduce((acc, { productId, quantity, price }) => {
        return productIds.includes(productId) ? acc + quantity * price : acc
      }, 0)
      if (totalPriceDiscountedProducts === 0) throw new BadRequestError('No products are discounted')
      break
    default:
      throw new InternalServerError('Something is wrong with the discount code')
    }

    if (totalPriceDiscountedProducts < minOrderValue) {
      throw new BadRequestError(`Discount requires a minimum order value of ${minOrderValue}`)
    }

    // check max_uses_per_user

    let discountAmount = 0
    switch (type) {
    case 'fix amount':
      discountAmount = value
      break
    case 'percentage':
      discountAmount = totalPriceDiscountedProducts * (value / 100)
      break
    default:
      throw new InternalServerError('Something is wrong with the discount code')
    }

    return {
      totalPriceDiscountedProducts,
      discountAmount
    }
  }
}

module.exports = DiscountService