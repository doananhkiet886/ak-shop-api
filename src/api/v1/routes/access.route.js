'use strict'

const express = require('express')
const accessController = require('../controllers/access.controller')
const errorAsyncHandler = require('../../../core/errorAsyncHandler')

const router = express.Router()

router.post('/sign-up', errorAsyncHandler(accessController.signUp))
router.post('/sign-in', errorAsyncHandler(accessController.signIn))

module.exports = router
