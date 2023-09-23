const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/productController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(authenticate))

router.get('/draft/all', errorAsyncHandler(productController.getAllDraftProductsByShopId))
router.get('/published/all', errorAsyncHandler(productController.getAllPublishedProductsByShopId))

router.post('/', errorAsyncHandler(productController.createProduct))
router.post('/publish/:id', errorAsyncHandler(productController.publishProductByShopId))
router.post('/unpublish/:id', errorAsyncHandler(productController.unpublishProductByShopId))

module.exports = router