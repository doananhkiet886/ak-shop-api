const express = require('express')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.post('/:id', errorAsyncHandler(productController.publishProductForShop))

module.exports = router