const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(authenticate))

router.get('/draft/all', errorAsyncHandler(productController.getAllDraftProductsForShop))
router.get('/published/all', errorAsyncHandler(productController.getAllPublishedProductsForShop))

router.post('/', errorAsyncHandler(productController.createProduct))
router.post('/publish/:id', errorAsyncHandler(productController.publishProductForShop))
router.post('/unpublish/:id', errorAsyncHandler(productController.unpublishProductForShop))

module.exports = router