const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop.controller')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')

router.post('/', errorAsyncHandler(shopController.createShop))

module.exports = router