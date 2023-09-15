'use strict'

const { NODE_ENV_DEVELOPMENT, NODE_ENV_PRODUCTION, MONGODB_URI_DEFAULT } = require('./constants.config')

const development = {
  mongodbUri: process.env.MONGODB_URI || MONGODB_URI_DEFAULT
}

const production = {
  mongodbUri: process.env.MONGODB_URI || MONGODB_URI_DEFAULT
}

const dbConfig = {
  development,
  production
}

let env = process.env.NODE_ENV
const isValidEnv = env === NODE_ENV_DEVELOPMENT || env === NODE_ENV_PRODUCTION
if (!isValidEnv) env = NODE_ENV_DEVELOPMENT

module.exports = dbConfig[env]