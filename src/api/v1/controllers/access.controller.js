'use strict'

const { CreatedResponse, SuccessResponse, ResetContentResponse, OkResponse } = require('../../../core/successResponse')
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

  // [POST] /api/v1/sign-out
  async signOut(req, res) {
    new ResetContentResponse({
      message: 'Sign out successfully',
      metadata: await accessService.signOut({ keyToken: req.keyToken })
    }).send(res)
  }

  async refreshToken(req, res) {
    new OkResponse({
      metadata: await accessService.handleRefreshToken(req.body.refreshToken)
    }).send(res)
  }
}

module.exports = new AccessController()
