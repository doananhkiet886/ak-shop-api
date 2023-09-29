const {
  getDataInfo,
  convertValueToRegExOfKeyFromObject
} = require('../utils')

const sortOrder = {
  asc: 1,
  desc: -1
}

const getFilterKeysFromQueryObject = (queryObject = {}) => {
  const keys = Object.keys(queryObject)
  return keys.filter((key) => key[0] !== '_')
}

const createFilter = (queryObject = {}, flags = 'gi') => {
  const filterKeys = getFilterKeysFromQueryObject(queryObject)
  const filterObject = getDataInfo(queryObject, filterKeys)

  convertValueToRegExOfKeyFromObject(filterObject, flags)

  return filterObject
}

const createPagination = (queryObject = {}) => {
  const { _page = 1, _limit = 50 } = queryObject
  const skip = (_page - 1) * _limit
  return {
    skip,
    limit: _limit
  }
}

const createSorter = (queryObject = {}) => {
  const { _sort, _order } = queryObject
  return {
    [_sort]: sortOrder[_order]
  }
}

module.exports = {
  createFilter,
  createPagination,
  createSorter
}