const express = require('express')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.get('/all', errorAsyncHandler(productController.getAllDraftProductsForShop))

module.exports = router