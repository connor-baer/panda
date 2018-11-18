const bot = require('../bot');

bot.telegram.setWebhook(
  `${process.env.NOW_URL}/bot/${process.env.WEBHOOK_SECRET}`
);

module.exports = (req, res) => {
  bot.handleUpdate(req.body, res);
};
