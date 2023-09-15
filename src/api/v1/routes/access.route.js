'use strict'

const express = require('express')
const accessController = require('../controllers/access.controller')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')

const router = express.Router()

router.post('/signup', errorAsyncHandler(accessController.signup))

module.exports = router
