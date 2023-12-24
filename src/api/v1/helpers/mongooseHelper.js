'use strict'

const {
  flattenObject,
  removeUndefinedNullField
} = require('../utils')

const query = async (model, { filter = {}, populate, selector = '', pagination = {}, sorter = {} }) => {
  if (!model) throw new Error('The "model" parameter must be passed')
  return await model
    .find(filter)
    .populate(populate)
    .sort(sorter)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(selector)
    .lean()
}

const addSelects = ({ sourceSelect = '', selects = [] }) => {
  return sourceSelect.split(' ').concat(selects).join(' ')
}

const findOneAndUpdateFewFields = async (model, filter = {}, payload = {}, isNew = true) => {
  payload = removeUndefinedNullField(flattenObject(payload))
  return await model.findOneAndUpdate(filter, payload, { new: isNew })
}

module.exports = {
  query,
  addSelects,
  findOneAndUpdateFewFields
}
