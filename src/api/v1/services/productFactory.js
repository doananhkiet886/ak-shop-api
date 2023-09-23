const productTypes = require('./productTypes')
const {
  findAllDraftProductsForShop,
  findAllPublishedProductsForShop,
  publishProductForShop,
  unpublishProductForShop
} = require('../models/repositories/productRepo')
const { BadRequestError } = require('../../../core/errorResponse')

class ProductFactory {

  static productRegister = {}

  static registerProductType({ type = '', productClass }) {
    ProductFactory.productRegister[type] = productClass
  }

  static async createProduct({ type, payload }) {
    const productClass = ProductFactory.productRegister[type]
    if (!productClass) throw new BadRequestError('Invalid product type')

    return await new productClass(payload).createProduct()
  }

  static async findAllDraftProductsForShop({ shopId = '', skip, limit }) {
    const query = { shop: shopId, isDraft: true }
    return await findAllDraftProductsForShop({ query, skip, limit })
  }

  static async findAllPublishedProductsForShop({ shopId = '', skip, limit }) {
    const query = { shop: shopId, isPublished: true }
    return await findAllPublishedProductsForShop({ query, skip, limit })
  }

  static async publishProductForShop({ productId = '', shopId = '' }) {
    return await publishProductForShop({ productId, shopId })
  }

  static async unpublishProductForShop({ productId = '', shopId = '' }) {
    return await unpublishProductForShop({ productId, shopId })
  }
}

productTypes.forEach(productType => {
  ProductFactory.registerProductType(productType)
})

module.exports = ProductFactory