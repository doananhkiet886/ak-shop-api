const productTypes = require('./productTypes')
const {
  findAllDraftProductsByShopId,
  findAllPublishedProductsByShopId,
  publishProductByShopId
} = require('../models/repositories/productRepo')
const { BadRequestError } = require('../../../core/errorResponse')

class ProductFactory {

  static productRegister = {}

  static registerProductType({ type = '', productClass }) {
    ProductFactory.productRegister[type] = productClass
  }

  static async createProduct({ type, payload }) {
    const productClass = ProductFactory.productRegister[type]
    console.log({ productClass })
    if (!productClass) throw new BadRequestError('Invalid product type')

    return await new productClass(payload).createProduct()
  }

  static async findAllDraftProductsByShopId({ shopId = '', skip, limit }) {
    const query = { shop: shopId, isDraft: true }
    return await findAllDraftProductsByShopId({ query, skip, limit })
  }

  static async findAllPublishedProductsByShopId({ shopId = '', skip, limit }) {
    const query = { shop: shopId, isPublished: true }
    return await findAllPublishedProductsByShopId({ query, skip, limit })
  }

  static async publishProductByShopId({ productId = '', shopId = '' }) {
    return await publishProductByShopId({ productId, shopId })
  }
}

productTypes.forEach(productType => {
  ProductFactory.registerProductType(productType)
})

module.exports = ProductFactory