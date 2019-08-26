const { isFunction } = require('lodash/fp');

function asyncRoute(fn) {
  if (!fn || !isFunction(fn)) {
    throw TypeError(`'fn' must be a function`);
  }
  return (req, res) =>
    Promise.resolve(fn(req, res)).catch(error => {
      res.status(500);
      res.json({ error: error.message });
    });
}

module.exports = { asyncRoute };
