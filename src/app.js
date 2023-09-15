'use strict'

require('dotenv').config()
const express = require('express')
const { default: helmet } = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const db = require('./dbs')
const router = require('./routes')

const app = express()

// init db
db.connect()

// init middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))

// route app
app.use(router)

// handling error
app.use((error, req, res, next) => {
  const { statusCode, message } = error
  res.json({
    status: 'error',
    code: statusCode,
    message
  })
})

module.exports = app
