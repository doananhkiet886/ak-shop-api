const _ = require('lodash')

const getDataInfo = (obj = {}, fields = []) => {
  return _.pick(obj, fields)
}

const convertValueToRegExOfKeyFromObject = (object = {}, flags = '') => {
  Object
    .keys(object)
    .map((key) => {
      const regex = new RegExp(object[key], flags)
      object[key] = regex
    })
}

module.exports = {
  getDataInfo,
  convertValueToRegExOfKeyFromObject
}
