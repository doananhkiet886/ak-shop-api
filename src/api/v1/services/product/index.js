const productTypes = require('./productTypes')
const productRepo = require('../..//models/repositories/productRepo')
const { BadRequestError } = require('../../../../core/errorResponse')

const productRegister = {}

const registerProductType = async ({ type = '', productClass }) => {
  productRegister[type] = productClass
}

productTypes.forEach(productType => {
  registerProductType(productType)
})

const createProduct = async ({ type, payload }) => {
  const productClass = productRegister[type]
  if (!productClass) throw new BadRequestError('Invalid product type')

  return await new productClass(payload).createProduct()
}

const findAllDraftProductsForShop = async ({ shopId = '', skip, limit }) => {
  const query = { shop: shopId, isDraft: true }
  return await productRepo.findAllDraftProductsForShop({ query, skip, limit })
}

const findAllPublishedProductsForShop = async ({ shopId = '', skip, limit }) => {
  const query = { shop: shopId, isPublished: true }
  return await productRepo.findAllPublishedProductsForShop({ query, skip, limit })
}

const publishProductForShop = async ({ productId = '', shopId = '' }) => {
  return await productRepo.publishProductForShop({ productId, shopId })
}

const unpublishProductForShop = async ({ productId = '', shopId = '' }) => {
  return await productRepo.unpublishProductForShop({ productId, shopId })
}

const searchProductForBuyer = async ({ keyword }) => {
  return await productRepo.searchProductForBuyer({ keyword })
}

module.exports = {
  createProduct,
  findAllDraftProductsForShop,
  findAllPublishedProductsForShop,
  publishProductForShop,
  unpublishProductForShop,
  searchProductForBuyer
}