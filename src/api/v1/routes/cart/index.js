'use strict'

const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
// const queryStringMiddleware = require('../../middlewares/queryStringMiddleware')
const cartController = require('../../controllers/cartController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(authenticate))

router.get('/', errorAsyncHandler(cartController.getCartByUserIdForBuyer))
router.post('/', errorAsyncHandler(cartController.addProductToCartForBuyer))
router.post('/update', errorAsyncHandler(cartController.updateProductForBuyer))
router.delete('/:id', errorAsyncHandler(cartController.deleteProductForBuyer))

module.exports = router