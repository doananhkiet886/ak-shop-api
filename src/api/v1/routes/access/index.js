'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const errorAsyncHandler = require('../../../../core/errorAsyncHandler')
const authMiddleware = require('../../middlewares/auth.middleware')

const router = express.Router()

router.post('/sign-up', errorAsyncHandler(accessController.signUp))
router.post('/sign-in', errorAsyncHandler(accessController.signIn))

router.use(errorAsyncHandler(authMiddleware.authenticate))

router.post('/refresh-token', errorAsyncHandler(accessController.refreshToken))
router.post('/sign-out', errorAsyncHandler(accessController.signOut))

module.exports = router
