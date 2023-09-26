const productTypes = require('./productTypes')
const productRepo = require('../..//models/repositories/productRepo')
const { BadRequestError, NotFoundError } = require('../../../../core/errorResponse')

const productRegister = {}

const registerProductType = async ({ type = '', productClass }) => {
  productRegister[type] = productClass
}

productTypes.forEach(productType => {
  registerProductType(productType)
})

const createProduct = async ({ shopId, type, payload }) => {
  const productClass = productRegister[type]
  if (!productClass) throw new BadRequestError('Invalid product type')

  return await new productClass(payload).createProduct(shopId)
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
  const publishedProduct = await productRepo.publishProductForShop({ productId, shopId })
  if (!publishedProduct) throw new NotFoundError('Invalid Product ID')
  return publishedProduct
}

const unpublishProductForShop = async ({ productId = '', shopId = '' }) => {
  const unpublishedProduct = await productRepo.unpublishProductForShop({ productId, shopId })
  if (!unpublishedProduct) throw new NotFoundError('Invalid Product ID')
  return unpublishedProduct
}

const searchProductForBuyer = async ({ keyword }) => {
  const foundProducts = await productRepo.searchProductForBuyer({ keyword })
  const NO_ELEMENTS = 0
  const isEmptyProducts = foundProducts.length === NO_ELEMENTS
  if (isEmptyProducts) throw new NotFoundError('Not found product')

  return foundProducts
}

const findAllProductsForBuyer = async ({
  filter, limit, page, sort, select
}) => {
  return await productRepo.findAllProductsForBuyer({
    filter, limit, page, sort, select
  })
}

const findProductForBuyer = async ({ productId, select }) => {
  const foundProduct =  await productRepo.findProductForBuyer({ productId, select })
  if (!foundProduct) throw new NotFoundError('Invalid Product ID')

  return foundProduct
}

const updateProduct = async({ type, productId, shopId, payload = {} }) => {
  const productClass = productRegister[type]
  if (!productClass) throw new BadRequestError('Invalid product type')

  const updatedProduct = await new productClass(payload).updateProduct({
    productId, shopId
  })
  if (!updatedProduct) throw new NotFoundError('Invalid Product ID')

  return updatedProduct
}

module.exports = {
  createProduct,
  findAllDraftProductsForShop,
  findAllPublishedProductsForShop,
  publishProductForShop,
  unpublishProductForShop,
  searchProductForBuyer,
  findAllProductsForBuyer,
  findProductForBuyer,
  updateProduct
}