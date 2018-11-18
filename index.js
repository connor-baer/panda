const { router, get } = require('microrouter');

const bot = require('./routes/bot');
const notFound = require('./routes/404');

module.exports = router(get('/bot/*', bot), get('/*', notFound));
