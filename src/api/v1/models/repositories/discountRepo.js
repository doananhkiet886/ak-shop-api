const discountModel = require('../discountModel')
const { query } = require('../../helpers/mongooseHelper')

const populate = { path: 'shop', select: 'name -_id' }

const findActiveDiscountByCode = async (code) => {
  return await discountModel.findOne({ code, isActive: true }).lean()
}

const findDiscountByCode = async (code) => {
  return await discountModel.findOne({ code }).lean()
}

module.exports = {
  findActiveDiscountByCode,
  findDiscountByCode
}