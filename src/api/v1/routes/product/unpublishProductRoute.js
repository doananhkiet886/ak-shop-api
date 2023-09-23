const express = require('express')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.post('/:id', errorAsyncHandler(productController.unpublishProductForShop))

module.exports = router