const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
});

bot.use((ctx, next) => {
  const start = new Date();
  return next(ctx).then(() => {
    const ms = new Date() - start;
    console.log('Response time %sms', ms);
  });
});

bot.hears(/hello/i, ctx => ctx.reply('Hello world'));

module.exports = bot;
