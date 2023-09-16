'use strict'

const { CreatedResponse, SuccessResponse } = require('../../../core/successResponse')
const accessService = require('../services/access.service')

class AccessController {
  // [POST] /api/v1/sign-up
  async signUp(req, res) {
    new CreatedResponse({
      message: 'Sign up successfully',
      metadata: await accessService.signUp(req.body)
    }).send(res)
  }

  // [POST] /api/v1/sign-in
  async signIn(req, res) {
    new SuccessResponse({
      message: 'Sign in successfully',
      metadata: await accessService.signIn(req.body)
    }).send(res)
  }
}

module.exports = new AccessController()
