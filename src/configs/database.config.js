'use strict'

const mongoose = require('mongoose')
const { NODE_ENV_DEVELOPMENT } = require('../configs/constants.config')
const { env, db: { host, port, name } } = require('./environment.config')

const mongodbUri = `mongodb://${host}:${port}/${name}`

class Database {
  constructor() {

  }

  connect() {
    mongoose
      .connect(mongodbUri)
      .then(() => console.log('Connect to MongoDB successfully'))
      .catch(() => console.log('Connect to MongoDB failure'))

    if (env === NODE_ENV_DEVELOPMENT) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceDB = Database.getInstance()

module.exports = instanceDB
