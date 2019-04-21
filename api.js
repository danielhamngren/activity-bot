const express = require("express");
const utils = require("./utils");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  user_id = 1;
  utils.get_activity_table(user_id, result => {
    res.send(result);
  });
});

app.get("/user/:user_id", (req, res) => {
  user_id = 1;
  utils.get_activity_table(req.params.user_id, result => {
    let date = new Date().toISOString();
    console.log(date);
    res.send(result);
  });
});

app.listen(PORT, () => console.log(`Activity app listening on port ${PORT}!`));

module.exports = app;
