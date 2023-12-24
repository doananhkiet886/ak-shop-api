'use strict'

const cartRepo = require('../models/repositories/cartRepo')
const discountService = require('./discountService')
const orderModel = require('../models/orderModel')
const { BadRequestError } = require('../../../core/errorResponse')
const { checkProductsAvailable } = require('../models/repositories/productRepo')
const { acquireLock, releaseLock } = require('./redisService')

class CheckoutService {
  static async checkoutReview(userId, requestBody = { cartId: '', shopOrderIds: [] }) {
    const { cartId, shopOrderIds } = requestBody
    const foundCart = await cartRepo.findCartByCartIdUserId({ cartId, userId })
    if (!foundCart) throw new BadRequestError('Cart does not exists')

    const totalPayment = {
      totalPrice: 0,
      feeShip: 0,
      totalDiscount: 0,
      totalOrder: 0 // total order value must be paid
    }
    const newShopOrderIds = []
    const newShopOrderId = {
      shopId: '',
      discounts: [],
      products: [],
      totalPrice: 0, // total price before applying discounts
      totalPriceApplyDiscount: 0 // total price after applying discounts
    }

    for (const shopOrderId of shopOrderIds) {
      const { shopId, discounts = [], products = [] } = shopOrderId

      const checkedProducts = await checkProductsAvailable(products)
      if (checkedProducts.includes(undefined)) throw new BadRequestError('Order wrong')

      const totalPrice = checkedProducts.reduce((acc, product) => {
        return acc + (product.quantity * product.price)
      }, 0)

      totalPayment.totalPrice = totalPrice
      Object.assign(newShopOrderId, {
        shopId,
        discounts,
        products: checkedProducts,
        totalPrice,
        totalPriceApplyDiscount: totalPrice
      })

      if (discounts.length > 0) {
        // gia su chi co 1 discount
        const { discountAmount } = await discountService.getDiscountAmount(
          discounts[0].discountCode,
          checkedProducts
        )

        totalPayment.totalDiscount += discountAmount

        newShopOrderId.totalPriceApplyDiscount = totalPrice - discountAmount
      }

      totalPayment.totalOrder += newShopOrderId.totalPriceApplyDiscount
      newShopOrderIds.push(newShopOrderId)
    }

    return {
      shopOrderIds,
      newShopOrderIds,
      totalPayment
    }
  }

  static async orderForBuyer({
    shopOrderIds,
    cartId,
    userId,
    userAddress = {},
    userPayment = {}
  }) {
    const { newShopOrderIds, totalPayment } = await CheckoutService.checkoutReview(userId, {
      cartId,
      shopOrderIds
    })

    // check lai 1 lan nua xem vuot ton kho hay khong?
    const products = newShopOrderIds.flatMap(order => order.products)
    const acquireProduct = []
    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i]
      const keyLock = await acquireLock(productId, quantity, cartId)
      acquireProduct.push(keyLock ? true : false)
      if (keyLock) {
        await releaseLock(keyLock)
      }
    }

    // check neu co 1 san pham het hang trong khong
    if (acquireProduct.includes(false)) {
      throw new BadRequestError('Some product are updated. Please back cart')
    }

    const newOrder = await orderModel.create({
      userId,
      checkout: totalPayment,
      shipping: userAddress,
      payment: userPayment,
      products: newShopOrderIds
    })

    // truong hop: neu insert thanh cong, thi remove product co trong cart
    if (newOrder) {
      // remove product in cart
    }

    return newOrder
  }

  static async getOrdersForUser() {

  }

  static async getOrderForUser() {

  }

  static async cancelOrdersForUser() {

  }

  // for shop, admin
  static async updateOrderStatusForShop() {

  }
}

module.exports = CheckoutService