'use strict'

const { CreatedResponse, SuccessResponse, ResetContentResponse, OkResponse } = require('../../../core/successResponse')
const accessService = require('../services/accessService')

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
      metadata: await accessService.signOut(req.keyToken)
    }).send(res)
  }

  // [POST] /api/v1/access/refresh-token
  async refreshToken(req, res) {
    new OkResponse({
      metadata: await accessService.handleRefreshToken(
        req.keyToken,
        req.user,
        req.refreshToken
      )
    }).send(res)
  }
}

module.exports = new AccessController()
