'use strict'

const { NODE_ENV_DEVELOPMENT, NODE_ENV_PRODUCTION, PORT_DEFAULT } = require('./constants.config')

const development = {
  port: process.env.PORT || PORT_DEFAULT
}

const production = {
  port: process.env.PORT || PORT_DEFAULT
}

const envConfig = {
  development,
  production
}

let env = process.env.NODE_ENV
const isValidEnv = env === NODE_ENV_DEVELOPMENT || env === NODE_ENV_PRODUCTION
if (!isValidEnv) env = NODE_ENV_DEVELOPMENT

module.exports = envConfig[env]