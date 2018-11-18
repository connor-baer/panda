const { json } = require('micro');

const bot = require('../bot');
const { asyncRoute } = require('../lib/async-helpers');

module.exports = asyncRoute(async (req, res) => {
  const body = await json(req);
  const { chatId, message, ...options } = body;
  await bot.telegram.sendMessage(chatId, message, options);
  res.end('Message sent.');
});
