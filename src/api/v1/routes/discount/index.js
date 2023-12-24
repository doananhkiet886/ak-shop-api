'use strict'

const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const queryStringMiddleware = require('../../middlewares/queryStringMiddleware')
const discountController = require('../../controllers/discountController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.get(
  '/get_all_products',
  errorAsyncHandler(queryStringMiddleware),
  errorAsyncHandler(discountController.getAllProductsByCodeForBuyer)
)

router.get('/discount-amount', errorAsyncHandler(discountController.getDiscountAmount))

router.use(errorAsyncHandler(authenticate))

router.post('/', errorAsyncHandler(discountController.createDiscount))

router.patch('/:id', errorAsyncHandler(discountController.updateDiscount))

module.exports = router