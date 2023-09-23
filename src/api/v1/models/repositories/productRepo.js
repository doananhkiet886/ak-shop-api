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

const findAllPublishedProductsByShopId = async ({ query, skip, limit }) => {
  return await queryProduct({ query, skip, limit })
}

const publishProductByShopId = async ({ productId = '', shopId = '' }) => {
  const foundProduct = await productModel.findOne({
    _id: productId,
    shop: shopId
  })
  if (!foundProduct) return null

  foundProduct.isDraft = false
  foundProduct.isPublished = true

  const modifiedCount = await foundProduct.save()
  return modifiedCount
}

const unpublishProductByShopId = async ({ productId = '', shopId = '' }) => {
  const foundProduct = await productModel.findOne({
    _id: productId,
    shop: shopId
  })
  if (!foundProduct) return null

  foundProduct.isDraft = true
  foundProduct.isPublished = false

  const modifiedCount = await foundProduct.save()
  return modifiedCount
}

module.exports = {
  findAllDraftProductsByShopId,
  findAllPublishedProductsByShopId,
  publishProductByShopId,
  unpublishProductByShopId
}