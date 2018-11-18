const Telegraf = require('telegraf');
const updateLogger = require('telegraf-update-logger');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(updateLogger({ colors: true }));

bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
});

bot.hears(/hello/i, ctx => ctx.reply('Hello world'));

module.exports = bot;
