const { json } = require('micro');
const { replace } = require('lodash/fp');

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
  const statusCode = downtime.error;
  const name = check.alias || replace(/(?:https|http):\/\//i, '', check.url);
  const time = downtime.started_at || downtime.started_at;
  // eslint-disable-next-line max-len
  return `*${name}* ${statusEmoji} since ${time} because _${statusCode}_.\n Details: ${statusPageUrl}`;
}

module.exports = asyncRoute(async (req, res) => {
  const body = await json(req);
  const { chatId } = req.params;
  const message = constructMessage(body);
  await bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  res.end('Message sent.');
});
