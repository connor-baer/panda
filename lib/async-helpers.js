const { send } = require('micro');
const { isFunction } = require('lodash/fp');

function asyncRoute(fn) {
  if (!fn || !isFunction(fn)) {
    throw TypeError(`'fn' must be a function`);
  }
  return (req, res) =>
    Promise.resolve(fn(req, res)).catch(error => {
      send({ error }, 500);
    });
}

module.exports = { asyncRoute };
