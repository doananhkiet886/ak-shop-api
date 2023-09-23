const express = require('express')
const { authenticate } = require('../middlewares/authMiddleware')
const shopController = require('../../controllers/shopController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(authenticate))

router.post('/', errorAsyncHandler(shopController.createShop))

module.exports = router