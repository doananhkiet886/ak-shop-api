'use strict'

const app = require('./src/app')
const { port } = require('./src/configs/environment.config')

app.listen(port, () => {
  console.log('Server is running with port:', port)
})
