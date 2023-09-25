const _ = require('lodash')

const getDataInfo = (obj = {}, fields = []) => {
  return _.pick(obj, fields)
}

const convertValueToRegExOfKeyFromObject = (object = {}, flags = '') => {
  Object.keys(object).map((key) => {
    const regex = new RegExp(object[key], flags)
    object[key] = regex
  })
}

const isNormalObject = (obj) => {
  return obj === Object(obj) && !Array.isArray(obj)
}

const flattenObject = (obj = {}, parent, result = {}) => {
  for (const key in obj) {
    const propName = parent ? `${parent}.${key}` : key

    if (isNormalObject(obj[key])) {
      flattenObject(obj[key], propName, result)
    } else {
      result[propName] = obj[key]
    }
  }
  return result
}

const removeUndefinedNullField = (obj) => {
  return Object.fromEntries(
    Object.entries(obj)
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => value != null)
      .map(([key, value]) => {
        const finalValue =
          isNormalObject(value) ? removeUndefinedNullField(value) : value
        return [key, finalValue]
      })
  )
}

module.exports = {
  getDataInfo,
  convertValueToRegExOfKeyFromObject,
  isNormalObject,
  flattenObject,
  removeUndefinedNullField
}
