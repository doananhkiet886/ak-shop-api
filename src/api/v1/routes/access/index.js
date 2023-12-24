'use strict'

const express = require('express')
const accessController = require('../../controllers/accessController')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')
const { authenticate } = require('../../middlewares/authMiddleware')

const router = express.Router()

router.post('/sign-up', errorAsyncHandler(accessController.signUp))
router.post('/sign-in', errorAsyncHandler(accessController.signIn))

router.use(errorAsyncHandler(authenticate))

router.post('/refresh-token', errorAsyncHandler(accessController.refreshToken))
router.post('/sign-out', errorAsyncHandler(accessController.signOut))

module.exports = router
