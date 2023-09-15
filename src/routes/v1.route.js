'use strict'

const express = require('express')
const v1Router = require('../api/v1/routes')

const router = express.Router()

router.use('/v1', v1Router)

module.exports = router
