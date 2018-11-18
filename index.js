const { router, get, post } = require('microrouter');

const bot = require('./routes/bot');
const message = require('./routes/message');
const notFound = require('./routes/404');

module.exports = router(
  get('/bot/*', bot),
  get('/*', notFound),
  post('/api/v1/message', message),
  post('/*', notFound)
);
