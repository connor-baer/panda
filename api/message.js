const bot = require('../bot');
const { asyncRoute } = require('../lib/async-helpers');

const DEFAULT_OPTIONS = {
  parse_mode: 'Markdown'
};

module.exports = asyncRoute(async (req, res) => {
  const { chatId, message, ...options } = req.body;
  await bot.telegram.sendMessage(chatId, message, {
    ...DEFAULT_OPTIONS,
    ...options
  });
  res.send('Message sent.');
});
