const { json } = require('micro');

const bot = require('../bot');

bot.telegram.setWebhook(
  `${process.env.NOW_URL}/bot/${process.env.WEBHOOK_SECRET}`
);

module.exports = async (req, res) => {
  const body = await json(req);
  bot.handleUpdate(body, res);
};
