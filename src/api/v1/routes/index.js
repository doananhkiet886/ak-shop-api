'use strict'

const express = require('express')
const { checkApiKey, checkPermission, authenticate } = require('../middlewares/authMiddleware')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')
const accessRouter = require('./access')
const shopRouter = require('./shop')
const productRouter = require('./product')

const router = express.Router()

router.use(errorAsyncHandler(checkApiKey))
router.use(errorAsyncHandler(checkPermission('0000')))

router.use('/access', accessRouter)

router.use(errorAsyncHandler(authenticate))

router.use('/shops', shopRouter)
router.use('/products', productRouter)

module.exports = router
