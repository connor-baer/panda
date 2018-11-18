const { json, send } = require('micro');

const bot = require('../bot');

module.exports = async (req, res) => {
  try {
    const body = await json(req);
    const { chatId, message, ...options } = body;
    await bot.telegram.sendMessage(chatId, message, options);
    res.end('Message sent.');
  } catch (error) {
    send({ error }, 500);
  }
};
