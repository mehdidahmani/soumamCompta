const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./remove');
const summary = require('./summary');
const paginatedList = require('./paginatedList');

module.exports = {
  create,
  read,
  update,
  remove,
  summary,
  paginatedList,
};