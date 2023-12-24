'use strict'

const app = require('./src/app')
const { app: { host, port } } = require('./src/configs/environmentConfig')

app.listen(port, host, () => {
  console.log(`Server is running at: http://${host}:${port}`)
})
