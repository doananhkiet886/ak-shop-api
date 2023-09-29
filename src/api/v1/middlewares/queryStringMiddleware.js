const {
  createFilter,
  createPagination,
  createSorter
} = require('../helpers/queryStringHelper')

const queryStringMiddleware = async (req, res, next) => {
  const filter = createFilter(req.query)
  const selector = req.query._select || ''
  const pagination = createPagination(req.query)
  const sorter = createSorter(req.query)

  req.filter = filter
  req.selector = selector
  req.pagination = pagination
  req.sorter = sorter
  next()
}

module.exports = queryStringMiddleware