const Telegraf = require("telegraf");
const utils = require("./utils");

const bot = new Telegraf(process.env.BOT_TOKEN);

const should_send_to_db = true;

bot.start(ctx => ctx.reply("Welcome"));

bot.hears(/./, ctx => {
  //console.log(ctx.update.message);
  const text = ctx.update.message.text;
  const unix_timestamp = ctx.update.message.date;
  const date = new Date(unix_timestamp * 1000);
  const user_id = ctx.update.message.from.id;

  console.log(date, text);

  [prefix, message] = utils.split_prefix(text);

  if (should_send_to_db) {
    utils.send_to_db(user_id, prefix, unix_timestamp, message);
  }

  ctx.reply("ok");
});

bot.launch();
