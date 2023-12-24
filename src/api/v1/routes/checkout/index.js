'use strict'

const express = require('express')
const { authenticate } = require('../../middlewares/authMiddleware')
const checkoutController = require('../../controllers/checkoutController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(authenticate))

router.post('/review', errorAsyncHandler(checkoutController.checkoutReview))

module.exports = router
