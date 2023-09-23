const productTypes = require('./productTypes')
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
}

productTypes.forEach(productType => {
  ProductFactory.registerProductType(productType)
})

module.exports = ProductFactory