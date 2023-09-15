'use strict'

const express = require('express')
const { checkApiKey } = require('../middlewares/auth.middleware')
const accessRouter = require('./access.route')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')

const router = express.Router()

router.use(errorAsyncHandler(checkApiKey))

router.use('/access', accessRouter)

module.exports = router
