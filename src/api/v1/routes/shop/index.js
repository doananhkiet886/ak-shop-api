const express = require('express')
const router = express.Router()
const shopController = require('../../controllers/shopController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

router.post('/', errorAsyncHandler(shopController.createShop))

module.exports = router