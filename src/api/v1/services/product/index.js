const productTypes = require('./productTypes')
const productRepo = require('../..//models/repositories/productRepo')
const { BadRequestError, NotFoundError } = require('../../../../core/errorResponse')

const productRegister = {}

const registerProductType = async (type = '', productClass) => {
  productRegister[type] = productClass
}

productTypes.forEach(({ type, productClass }) => {
  registerProductType(type, productClass)
})

const createProduct = async (type = '', payload = {}) => {
  const productClass = productRegister[type]
  if (!productClass) throw new BadRequestError('Invalid product type')
  return await new productClass(payload).createProduct()
}

const findAllDraftProductsForShop = async (shopId = '', { filter, selector, pagination, sorter }) => {
  filter.shop = shopId,
  filter.isDraft = true
  return await productRepo.findAllDraftProductsForShop({ filter, selector, pagination, sorter })
}

const findAllPublishedProductsForShop = async (shopId = '', { filter, selector, pagination, sorter }) => {
  filter.shop = shopId,
  filter.isDraft = true

  return await productRepo.findAllPublishedProductsForShop({ filter, selector, pagination, sorter })
}

const publishProductForShop = async (productId = '', shopId = '') => {
  const publishedProduct = await productRepo.publishProductForShop(productId, shopId)
  if (!publishedProduct) throw new NotFoundError('Invalid Product ID')
  return publishedProduct
}

const unpublishProductForShop = async (productId = '', shopId = '') => {
  const unpublishedProduct = await productRepo.unpublishProductForShop(productId, shopId)
  if (!unpublishedProduct) throw new NotFoundError('Invalid Product ID')
  return unpublishedProduct
}

const searchProductForBuyer = async (keyword, { filter, selector, pagination }) => {
  const foundProducts = await productRepo.searchProductForBuyer(keyword, { filter, selector, pagination })
  const NO_ELEMENTS = 0
  const isEmptyProducts = foundProducts.length === NO_ELEMENTS
  if (isEmptyProducts) throw new NotFoundError('Not found product')

  return foundProducts
}

const findAllProductsForBuyer = async ({ filter, selector, pagination, sorter }) => {
  return await productRepo.findAllProductsForBuyer({ filter, selector, pagination, sorter })
}

const findProductForBuyer = async (productId = '', select = '') => {
  const foundProduct = await productRepo.findProductForBuyer(productId, select)
  if (!foundProduct) throw new NotFoundError('Invalid Product ID')

  return foundProduct
}

const updateProduct = async(type = '', productId = '', shopId = '', payload = {}) => {
  const productClass = productRegister[type]
  if (!productClass) throw new BadRequestError('Invalid product type')

  const updatedProduct = await new productClass(payload).updateProduct(productId, shopId)
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