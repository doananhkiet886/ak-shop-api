const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/productController')
const draftProductRouter = require('./draftProductRoute')
const publishedProductRouter = require('./publishedProductRoute')
const publishProductRouter = require('./publishProductRoute')
const unpublishProductRouter = require('./unpublishProductRoute')
const searchProductRouter = require('./searchProductRoute')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use('/search', searchProductRouter)

router.use(errorAsyncHandler(authenticate))

router.use('/draft', draftProductRouter)
router.use('/published', publishedProductRouter)

router.post('/', errorAsyncHandler(productController.createProduct))
router.use('/publish', publishProductRouter)
router.use('/unpublish', unpublishProductRouter)

module.exports = router