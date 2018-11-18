const { json } = require('micro');

const bot = require('../bot');
const { asyncRoute } = require('../lib/async-helpers');
const { CHECK_UP, CHECK_DOWN } = require('../lib/constants');

const emojiMap = {
  [CHECK_UP]: '👍',
  [CHECK_DOWN]: '👎',
  default: '🤷‍'
};

function constructMessage({ event, check = {}, downtime = {} }) {
  const statusEmoji = emojiMap[event] || emojiMap.default;
  const statusPageUrl = `https://updown.io/${check.token}`;
  const name =
    check.alias || check.url
      ? check.url.replace(/(?:https|http):\/\//i, '').replace('/', '')
      : '';
  const time = downtime.started_at || downtime.started_at;
  let message = `*${name}* ${statusEmoji} since ${time}`;

  if (event === CHECK_DOWN) {
    message += `because _${downtime.error}_.`;
  }

  message += `\nDetails: ${statusPageUrl}`;
  return message;
}

module.exports = asyncRoute(async (req, res) => {
  const { chatId } = req.query;

  if (!chatId) {
    throw new TypeError('Expected a chatId');
  }

  const events = await json(req);

  events.forEach(event => {
    const message = constructMessage(event);
    bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  });
  res.end('Message(s) sent.');
});
