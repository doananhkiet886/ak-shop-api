'use strict'

const express = require('express')
const { checkApiKey, checkPermission } = require('../middlewares/authMiddleware')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')
const accessRouter = require('./access')
const shopRouter = require('./shop')
const productRouter = require('./product')
const discountRouter = require('./discount')
const cartRouter = require('./cart')
const checkoutRouter = require('./checkout')
const inventoryRouter = require('./inventory')

const router = express.Router()

// router.use(errorAsyncHandler(checkApiKey))
// router.use(errorAsyncHandler(checkPermission('0000')))

router.use('/access', accessRouter)
router.use('/shops', shopRouter)
router.use('/products', productRouter)
router.use('/discounts', discountRouter)
router.use('/carts', cartRouter)
router.use('/checkout', checkoutRouter)
router.use('/inventory', inventoryRouter)

module.exports = router
