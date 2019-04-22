const emojiRegex = require("emoji-regex/text.js");
const { Pool } = require("pg");

exports.send_to_db = (user_id, prefix, unix_timestamp, text) => {
  // pools will use environment variables
  // for connection information
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const query = {
    name: "insert activity",
    text:
      "INSERT INTO activity (user_id, prefix, datetime, message) VALUES ($1, $2, to_timestamp($3), $4)",
    values: [user_id, prefix, unix_timestamp, text]
  }; //see https://node-postgres.com/features/queries#prepared-statements

  pool.query(query, (err, res) => {
    console.log(err);
    pool.end();
  });
};

exports.get_activity_table = (user_id, callback) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const query = {
    name: "get activities",
    text: "SELECT * FROM activity WHERE user_id=$1 ORDER BY datetime DESC",
    values: [user_id]
  };

  let result;
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }
    result = res.rows;
    pool.end();
    callback(result);
  });
};

exports.get_prefix = text => {
  matches = text.match(emojiRegex);

  if (matches !== null && matches.index === 0) {
    return matches[0];
  }
  return null;
};

exports.split_prefix = text => {
  let prefix = this.get_prefix(text);
  let message = text;

  if (prefix) {
    message = text.substring(text.indexOf(prefix) + prefix.length).trim();
  }
  return [prefix, message];
};
