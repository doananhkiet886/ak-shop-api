const _ = require('lodash')

const getDataInfo = (obj = {}, fields = []) => {
  return _.pick(obj, fields)
}

module.exports = getDataInfo