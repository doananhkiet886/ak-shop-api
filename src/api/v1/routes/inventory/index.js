'use strict'

const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const inventoryController = require('../../controllers/inventoryController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(authenticate))

router.post('/', errorAsyncHandler(inventoryController.addStock))

module.exports = router
