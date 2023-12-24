'use strict'

const cartModel = require('../models/cartModel')
const cartRepo = require('../models/repositories/cartRepo')
const inventoryRepo = require('../models/repositories/inventoryRepo')
const productRepo = require('../models/repositories/productRepo')
const { NotFoundError, BadRequestError } = require('../../../core/errorResponse')
/**
 * Add product to cart
 * Reduce product quantity
 * Increase product quantity
 * Get products on cart
 * Delete cart
 * Delete cart item
 */

class CartService {
  static async createCart(userId) {
    return await cartModel.create({
      user: userId,
      state: 'active'
    })
  }

  static async updateProductQuantity(userId, productAdded) {
    const { productId, quantity } = productAdded

    const filter = {
      user: userId,
      'products.productId': productId,
      state: 'active'
    }
    const update = {
      $inc: {
        countProducts: quantity,
        'products.$.quantity': quantity
      }
    }
    const options = {
      new: true
    }

    return await cartModel.findOneAndUpdate(filter, update, options)
  }

  /**
   * 1. find cart by userId
   * 2. check cart exists?
   * 3. check cart active?
   * 4. 
   */
  static async addProductToCartForBuyer(userId, productAdded) {
    const foundProduct = await productRepo.findProductById(productAdded.productId)
    const foundInventory = await inventoryRepo.findInventoryByProductId(productAdded.productId)
    if (!foundProduct && !foundInventory) throw new BadRequestError('Product does not exists')

    const isEnoughQuantity = productAdded.quantity > foundInventory.stock
    if (isEnoughQuantity) throw new BadRequestError('Not enough quantity in stock')

    const foundCart = await cartModel.findOne({
      user: userId
    })
    if (!foundCart) throw new NotFoundError('Not found cart')
    if (foundCart.state != 'active') throw new BadRequestError('Cart is inactive')

    const isProductExist = foundCart.products.some((product, index) => {
      const isExist = product.productId.toString() === productAdded.productId
      // Increase quantity
      if (isExist) {
        foundCart.products[index].quantity += productAdded.quantity
        return true
      }
      return false
    })

    if (!isProductExist) {
      foundCart.products.push(productAdded)
    }

    foundCart.countProducts += productAdded.quantity

    return await foundCart.save()
  }

  static async updateProductForBuyer(userId, product) {
    const { productId, quantity, oldQuantity } = product

    const foundProduct = await cartRepo.findProductInCartActive(productId)
    if (!foundProduct) throw new NotFoundError('Product does not exists')

    if (quantity === 0) {
      return await CartService.deleteProductForBuyer(userId, productId)
    }

    if (foundProduct.quantity !== oldQuantity) throw new BadRequestError('Invalid old quantity')

    return await CartService.updateProductQuantity(userId, {
      productId,
      quantity: quantity - oldQuantity
    })
  }

  static async deleteProductForBuyer(userId, productId) {
    const filter = { user: userId, state: 'active' }
    const update = {
      $pull: {
        products: {
          productId
        }
      },
      $inc: {
        countProducts: -1
      }
    }

    const deletedCart = await cartRepo.findOneAndUpdate(filter, update)
    return deletedCart
  }

  static async findCartByUserIdForBuyer(userId = '') {
    const foundCart = await cartRepo.findCartByUserId(userId)
    if (!foundCart) throw new BadRequestError('Cart does not exists')

    return foundCart
  }
}

module.exports = CartService