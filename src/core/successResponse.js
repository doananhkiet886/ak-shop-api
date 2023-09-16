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
  constructor({ message = ReasonPhrases.CREATED, statusCode = StatusCodes.CREATED, metadata }) {
    super({ message, statusCode, metadata })
  }
}

class ResetContentResponse extends SuccessResponse {
  constructor({ message = ReasonPhrases.RESET_CONTENT, statusCode = StatusCodes.RESET_CONTENT, metadata }) {
    super({ message, statusCode, metadata })
  }
}

module.exports = {
  SuccessResponse,
  OkResponse,
  CreatedResponse,
  ResetContentResponse
}