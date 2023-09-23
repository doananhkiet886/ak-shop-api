const productModel = require('../productModel')

const queryProduct = async({ query = {}, skip = 0, limit = 50 }) => {
  return await productModel
    .find(query)
    .populate({ path: 'shop', select: 'name -_id' })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
}

const findAllDraftProductsByShopId = async ({ query, skip, limit }) => {
  return await queryProduct({ query, skip, limit })
}

module.exports = {
  findAllDraftProductsByShopId
}