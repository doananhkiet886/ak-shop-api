const express = require('express')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.get('/:keyword', errorAsyncHandler(productController.searchProductForBuyer))

module.exports = router