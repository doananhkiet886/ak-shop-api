const {
  getDataInfo,
  convertValueToRegExOfKeyFromObject,
  flattenObject,
  removeUndefinedNullField
} = require('../utils')

const getFilterKeysFromQueryObject = (queryObject = {}) => {
  const keys = Object.keys(queryObject)
  return keys.filter((key) => key[0] !== '_')
}

const createFilterObjectFromQueryObject = ({
  queryObject = {},
  flags = 'gi'
}) => {
  const filterKeys = getFilterKeysFromQueryObject(queryObject)
  const filterObject = getDataInfo(queryObject, filterKeys)

  convertValueToRegExOfKeyFromObject(filterObject, flags)

  return filterObject
}

const addSelects = ({ sourceSelect = '', selects = [] }) => {
  return sourceSelect.split(' ').concat(selects).join(' ')
}

const findOneAndUpdateFewFields = async ({ model, filter = {}, payload = {}, isNew = true }) => {
  payload = removeUndefinedNullField(flattenObject(payload))
  return await model.findOneAndUpdate(filter, payload, { new: isNew })
}

module.exports = {
  getFilterKeysFromQueryObject,
  createFilterObjectFromQueryObject,
  addSelects,
  findOneAndUpdateFewFields
}
