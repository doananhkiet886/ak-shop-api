const productModel = require('../product/productModel')

const queryProduct = async({ query = {}, skip = 0, limit = 50 }) => {
  return await productModel
    .find(query)
    .populate({ path: 'shop', select: 'name -_id' })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
}


const findProductById = async (id) => {
  return await productModel.findById(id).lean()
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

  const unpublishProduct = await foundProduct.save()
  return unpublishProduct
}

const searchProductForBuyer = async ({ keyword = '' }) => {
  const searchRegEx = new RegExp(keyword)
  const searchedProduct = await productModel
    .find({
      isPublished: true,
      $text: { $search: searchRegEx }
    }, {
      score: { $meta: 'textScore' }
    })
    .sort({
      score: { $meta: 'textScore' }
    })
    .select('-score')
    .lean()

  return searchedProduct
}

const findAllProductsForBuyer = async ({
  filter = { isPublished: true }, limit = 50, page = 1, sort = 'ctime', select = ''
}) => {
  if (!filter?.isPublished) filter.isPublished = true
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

  const products = await productModel
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()
  return products
}

const findProductForBuyer = async ({
  productId = '', select = ''
}) => {
  const product = await productModel
    .findById(productId)
    .select(select)
    .lean()
  return product
}

module.exports = {
  findProductById,
  findAllDraftProductsForShop,
  findAllPublishedProductsForShop,
  publishProductForShop,
  unpublishProductForShop,
  searchProductForBuyer,
  findAllProductsForBuyer,
  findProductForBuyer
}