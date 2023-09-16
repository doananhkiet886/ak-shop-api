'use strict'

const { CreatedResponse, SuccessResponse } = require('../../../core/successResponse')
const accessService = require('../services/access.service')

class AccessController {
  // [POST] /api/v1/signup
  async signup(req, res) {
    new CreatedResponse({
      message: 'Signup successfully',
      metadata: await accessService.signup(req.body)
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
