const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

router.post('/', errorAsyncHandler(productController.createProduct))

module.exports = router