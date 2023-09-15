'use strict'

const express = require('express')
const { default: helmet } = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const database = require('./configs/database.config')
const router = require('./routes')

const app = express()

// init db
database.connect()

// init middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))

// route app
app.use(router)

// handling error
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const { statusCode, message } = error
  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message
  })
})

module.exports = app
