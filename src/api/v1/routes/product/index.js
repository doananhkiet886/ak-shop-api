const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(authenticate))

router.post('/', errorAsyncHandler(productController.createProduct))
router.get('/draft/all', errorAsyncHandler(productController.getAllDraftProductsByShopId))

module.exports = router