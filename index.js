const Telegraf = require("telegraf");
const utils = require("./utils");
var apiApp = require("./api"); //starts the api express endpoint
const express = require("express");

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "super-activity-bot.herokuapp.com";
const BOT_TOKEN = process.env.BOT_TOKEN;
const RUN_LOCAL = process.env.RUN_LOCAL;

const bot = new Telegraf(BOT_TOKEN);

if (RUN_LOCAL === "TRUE") {
  console.log("Running locally");
  bot.launch();
} else {
  console.log("Running live");
  apiApp.use(bot.webhookCallback(`/bot${BOT_TOKEN}`));
  bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
}

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
