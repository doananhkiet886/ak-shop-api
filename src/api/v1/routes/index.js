'use strict'

const express = require('express')
const { checkApiKey, checkPermission } = require('../middlewares/auth.middleware')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')
const accessRouter = require('./access.route')
const shopRouter = require('./shop.route')

const router = express.Router()

router.use(errorAsyncHandler(checkApiKey))
router.use(errorAsyncHandler(checkPermission('0000')))

router.use('/access', accessRouter)
router.use('/shops', shopRouter)

module.exports = router
