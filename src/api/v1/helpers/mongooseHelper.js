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

const createFilterObjectFromQueryObject = (queryObject = {}, flags = 'gi') => {
  const filterKeys = getFilterKeysFromQueryObject(queryObject)
  const filterObject = getDataInfo(queryObject, filterKeys)

  convertValueToRegExOfKeyFromObject(filterObject, flags)

  return filterObject
}

const addSelects = ({ sourceSelect = '', selects = [] }) => {
  return sourceSelect.split(' ').concat(selects).join(' ')
}

const findOneAndUpdateFewFields = async (model, filter = {}, payload = {}, isNew = true) => {
  payload = removeUndefinedNullField(flattenObject(payload))
  return await model.findOneAndUpdate(filter, payload, { new: isNew })
}

const queryManyOptions = async ({
  model, filter = { isPublished: true }, _limit = 50,
  _page = 1, _sort = 'ctime', _select = ''
}) => {
  if (!filter?.isPublished) filter.isPublished = true
  const skip = (_page - 1) * _limit
  const sortBy = _sort === 'ctime' ? { _id: -1 } : { _id: 1 }

  const result = await model
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(_limit)
    .select(_select)
    .lean()
  return result
}

module.exports = {
  getFilterKeysFromQueryObject,
  createFilterObjectFromQueryObject,
  addSelects,
  findOneAndUpdateFewFields,
  queryManyOptions
}
