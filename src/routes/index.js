'use strict'

const express = require('express')
const v1Router = require('./v1.route')
const { NotFoundError } = require('../core/errorResponse')

const router = express.Router()

router.use('/api', v1Router)

router.use((req, res, next) => {
  const error = new NotFoundError()
  console.log('BUG::', error)
  next(error)
})

module.exports = router
