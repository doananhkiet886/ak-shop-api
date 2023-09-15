'use strict'

const { StatusCodes, ReasonPhrases } = require('../core/httpStatusCode')

class SuccessResponse {
  constructor({ message = ReasonPhrases.OK, statusCode = StatusCodes.OK, metadata = {} }) {
    this.message = message
    this.statusCode = statusCode,
    this.metadata = metadata
  }

  send(res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: this.message,
      metadata: this.metadata
    })
  }
}

class OkResponse extends SuccessResponse {
  constructor({ metadata }) {
    super({ metadata })
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ message = ReasonPhrases.CREATED, metadata =StatusCodes.CREATED }) {
    super({ message, metadata })
  }
}

module.exports = {
  SuccessResponse,
  OkResponse,
  CreatedResponse
}