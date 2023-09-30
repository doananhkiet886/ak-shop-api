'use strict'

const productModel = require('../product/productModel')
const { query } = require('../../helpers/mongooseHelper')

const populate = { path: 'shop', select: 'name -_id' }

const findProductById = async (id) => {
  return await productModel.findById(id).lean()
}

const findAllDraftProductsForShop = async ({ filter, selector, pagination, sorter }) => {
  return await query(productModel, { filter, selector, pagination, sorter })
}

const findAllPublishedProductsForShop = async ({ filter, selector, pagination, sorter }) => {
  return await query(productModel, { filter, selector, pagination, sorter })
}

const publishProductForShop = async (productId = '', shopId = '') => {
  const foundProduct = await productModel.findOne({
    _id: productId,
    shop: shopId
  })
  if (!foundProduct) return null

  foundProduct.isDraft = false
  foundProduct.isPublished = true

  const modifiedCount = await foundProduct.save()
  return modifiedCount
}

const unpublishProductForShop = async (productId = '', shopId = '') => {
  const foundProduct = await productModel.findOne({
    _id: productId,
    shop: shopId
  })
  if (!foundProduct) return null

  foundProduct.isDraft = true
  foundProduct.isPublished = false

  const unpublishProduct = await foundProduct.save()
  return unpublishProduct
}

const searchProductForBuyer = async (keyword = '', { filter = {}, selector = '', pagination = {} }) => {
  const searchRegEx = new RegExp(keyword)
  filter.isPublished = true
  filter.$text = { $search: searchRegEx }

  const searchedProduct = await productModel
    .find(filter, {
      score: { $meta: 'textScore' }
    })
    .populate(populate)
    .sort({
      score: { $meta: 'textScore' }
    })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .select(selector)
    .lean()

  return searchedProduct
}

const findAllProductsForBuyer = async ({ filter, selector, pagination, sorter }) => {
  filter.isPublished = true
  const products = await query(productModel, { populate, filter, selector, pagination, sorter })
  return products
}

const findProductForBuyer = async (productId = '', select = '') => {
  return await productModel.findById(productId).select(select)
}

module.exports = {
  findProductById,
  findAllDraftProductsForShop,
  findAllPublishedProductsForShop,
  publishProductForShop,
  unpublishProductForShop,
  searchProductForBuyer,
  findAllProductsForBuyer,
  findProductForBuyer
}