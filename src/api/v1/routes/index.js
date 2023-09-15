'use strict'

const express = require('express')
const accessRouter = require('./access.route')

const router = express.Router()

router.use('/access', accessRouter)

module.exports = router
