const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

router.post('/', errorAsyncHandler(productController.createProduct))

module.exports = router