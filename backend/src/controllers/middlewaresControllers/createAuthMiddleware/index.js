const login = require('./login');
const logout = require('./logout');
const isValidAuthToken = require('./isValidAuthToken');

module.exports = {
  login,
  logout,
  isValidAuthToken,
};