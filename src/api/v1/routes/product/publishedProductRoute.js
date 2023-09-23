const express = require('express')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.get('/all', errorAsyncHandler(productController.getAllPublishedProductsForShop))

module.exports = router