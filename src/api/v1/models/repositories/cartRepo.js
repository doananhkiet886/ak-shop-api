const cartModel = require('../../models/cartModel')

const findCartByUserId = async (userId) => {
  return await cartModel.findOne({
    user: userId
  }).lean()
}

const findProductInCartActive = async (productId) => {
  const foundCart = await cartModel.findOne({
    'products.productId': productId,
    state: 'active'
  }).lean()
  if (!foundCart) return null

  const { products } = foundCart
  for (let product of products) {
    if (product.productId.toString() === productId) {
      return product
    }
  }
  return null
}

const findOneAndUpdate = async (filter = {}, update = {}) => {
  return await cartModel.findOneAndUpdate(filter, update, { new: true })
}

module.exports = {
  findCartByUserId,
  findProductInCartActive,
  findOneAndUpdate
}