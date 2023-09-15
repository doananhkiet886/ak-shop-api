'use strict'

const express = require('express')
const { checkApiKey, checkPermission } = require('../middlewares/auth.middleware')
const accessRouter = require('./access.route')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(checkApiKey))
router.use(errorAsyncHandler(checkPermission('0000')))

router.use('/access', accessRouter)

module.exports = router
