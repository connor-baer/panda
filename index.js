const { router, get, post } = require('microrouter');

const bot = require('./routes/bot');
const message = require('./routes/message');
const updown = require('./routes/updown');
const notFound = require('./routes/404');

module.exports = router(
  get('/bot/*', bot),
  get('/*', notFound),
  post('/api/v1/message', message),
  post('/api/v1/updown/', updown),
  post('/*', notFound)
);
