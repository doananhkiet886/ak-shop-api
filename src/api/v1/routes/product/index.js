const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/productController')
const queryStringMiddleware = require('../../middlewares/queryStringMiddleware')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.get('/search/:keyword', errorAsyncHandler(queryStringMiddleware), errorAsyncHandler(productController.searchProductForBuyer))
router.get('/', errorAsyncHandler(queryStringMiddleware), errorAsyncHandler(productController.getAllProductsForBuyer))
router.get('/:id', errorAsyncHandler(productController.getProductForBuyer))

router.use(errorAsyncHandler(authenticate))

router.get('/draft/all', errorAsyncHandler(queryStringMiddleware), errorAsyncHandler(productController.getAllDraftProductsForShop))
router.get('/published/all', errorAsyncHandler(queryStringMiddleware), errorAsyncHandler(productController.getAllPublishedProductsForShop))

router.post('/', errorAsyncHandler(productController.createProduct))
router.post('/publish/:id', errorAsyncHandler(productController.publishProductForShop))
router.post('/unpublish/:id', errorAsyncHandler(productController.unpublishProductForShop))
router.patch('/:id', errorAsyncHandler(productController.updateProduct))

module.exports = router