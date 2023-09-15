'use strict'

require('dotenv').config()
const {
  NODE_ENV_DEVELOPMENT,
  NODE_ENV_PRODUCTION,
  DEV_APP_HOST_DEFAULT,
  DEV_APP_PORT_DEFAULT,
  DEV_DB_HOST_DEFAULT,
  DEV_DB_PORT_DEFAULT,
  DEV_DB_NAME_DEFAULT,
  PROD_APP_HOST_DEFAULT,
  PROD_APP_PORT_DEFAULT,
  PROD_DB_HOST_DEFAULT,
  PROD_DB_PORT_DEFAULT,
  PROD_DB_NAME_DEFAULT
} = require('./constants.config')

const {
  NODE_ENV,
  DEV_APP_HOST,
  DEV_APP_PORT,
  DEV_DB_HOST,
  DEV_DB_PORT,
  DEV_DB_NAME,
  PROD_APP_HOST,
  PROD_APP_PORT,
  PROD_DB_HOST,
  PROD_DB_PORT,
  PROD_DB_NAME
} = process.env

const development = {
  env: NODE_ENV,
  app: {
    host: DEV_APP_HOST || DEV_APP_HOST_DEFAULT,
    port: DEV_APP_PORT || DEV_APP_PORT_DEFAULT
  },
  db: {
    host: DEV_DB_HOST || DEV_DB_HOST_DEFAULT,
    port: DEV_DB_PORT || DEV_DB_PORT_DEFAULT,
    name: DEV_DB_NAME || DEV_DB_NAME_DEFAULT
  }
}

const production = {
  env: NODE_ENV,
  app: {
    host: PROD_APP_HOST || PROD_APP_HOST_DEFAULT,
    port: PROD_APP_PORT || PROD_APP_PORT_DEFAULT
  },
  db: {
    host: PROD_DB_HOST || PROD_DB_HOST_DEFAULT,
    port: PROD_DB_PORT || PROD_DB_PORT_DEFAULT,
    name: PROD_DB_NAME || PROD_DB_NAME_DEFAULT
  }
}

const envConfigs = {
  development,
  production
}

const isValidEnv = NODE_ENV === NODE_ENV_DEVELOPMENT || NODE_ENV === NODE_ENV_PRODUCTION
const envConfig = isValidEnv ? envConfigs[NODE_ENV] : envConfigs[NODE_ENV_DEVELOPMENT]

module.exports = envConfig
