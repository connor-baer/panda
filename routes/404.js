const { send } = require('micro');

module.exports = async (req, res) => {
  const statusCode = 400;
  const data = { error: 'Not found' };
  send(res, statusCode, data);
};
