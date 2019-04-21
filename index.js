const Telegraf = require("telegraf");
const utils = require("./utils");
const express = require("express");
const expressApp = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "super-activity-bot.herokuapp.com";
const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Telegraf(BOT_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${BOT_TOKEN}`));

// bot.startPolling();

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

bot.launch({
  webhook: {
    domain: URL,
    hookPath: "/RANDOM_ID",
    port: PORT
  }
});

expressApp.get("/", (req, res) => {
  res.send("This is not the page you are looking for!");
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
