'use strict'

const express = require('express')
const v1Router = require('./v1.route')
const { NotFoundError } = require('../core/errorReponse')

const router = express.Router()

router.use('/api', v1Router)

router.use((req, res, next) => {
  throw new NotFoundError()
})

module.exports = router
