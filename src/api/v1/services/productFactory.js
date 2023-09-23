const { Types } = require('mongoose')
const productTypes = require('./productTypes')
const productRepo = require('../models/repositories/productRepo')
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
    const query = { shop: new Types.ObjectId(shopId), isDraft: true }
    return await productRepo.findAllDraftProductsByShopId({ query, skip, limit })
  }
}

productTypes.forEach(productType => {
  ProductFactory.registerProductType(productType)
})

module.exports = ProductFactory