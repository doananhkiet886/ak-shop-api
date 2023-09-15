'use strict'

const { CreatedResponse } = require('../../../core/successResponse')
const accessService = require('../services/access.service')

class AccessController {
  // [POST] /api/v1/signup
  async signup(req, res) {
    new CreatedResponse({
      message: 'Signup successfully',
      metadata: await accessService.signup(req.body)
    }).send(res)
  }
}

module.exports = new AccessController()
