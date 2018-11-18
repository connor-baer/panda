const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
});

bot.hears(/hello/, ctx => ctx.reply('Hello Connor'));

module.exports = bot;
