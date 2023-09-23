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

const findAllDraftProductsForShop = async ({ query, skip, limit }) => {
  return await queryProduct({ query, skip, limit })
}

const findAllPublishedProductsForShop = async ({ query, skip, limit }) => {
  return await queryProduct({ query, skip, limit })
}

const publishProductForShop = async ({ productId = '', shopId = '' }) => {
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

const unpublishProductForShop = async ({ productId = '', shopId = '' }) => {
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
  findAllDraftProductsForShop,
  findAllPublishedProductsForShop,
  publishProductForShop,
  unpublishProductForShop
}