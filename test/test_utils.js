var assert = require("assert");

const utils = require("../utils");

describe("Utils", () => {
  describe("utils.get_prefix(text)", () => {
    it("should return null when no prefix exists", () => {
      const text = "this text has no prefix";
      assert.equal(utils.get_prefix(text), null);
    });

    it("should return a prefix when emoji is in the beginning of input string", () => {
      const text = "🦄 this is a string with a prefix";
      assert.equal(utils.get_prefix(text), "🦄");
    });

    it("should not return a prefix when emoji is not in the beginning of input string", () => {
      const text = "This is a string with an emoji here 🦄.";
      assert.equal(utils.get_prefix(text), null);
    });

    it(
      "should return a prefix when emoji is in the beginning of input string, " +
        "even if there are multiple emojis",
      () => {
        const text = "🦄 this is a string with a prefix and more emojis 🦄";
        assert.equal(utils.get_prefix(text), "🦄");
      }
    );

    it("should return prefix even if we use this emoji: 🍽", () => {
      const text = "🍽 this should trigger a prefix";
      assert.equal(utils.get_prefix(text), "🍽");
    });
  });

  describe("utils.split_prefix(text)", () => {
    it("should return a string containing the prefix and one without", () => {
      const text = "🍽 this should trigger a prefix";
      [prefix, message] = utils.split_prefix(text);
      assert.equal(prefix, "🍽");
      assert.equal(message, "this should trigger a prefix");
    });

    it("should return undefined and a string when there is no prefix.", () => {
      const text = "has no prefix";
      [prefix, message] = utils.split_prefix(text);
      assert.equal(prefix, undefined);
      assert.equal(message, "has no prefix");
    });
  });

  describe("utils.send_to_db", () => {
    it("should not throw and exception when connecting", () => {
      user_id = 1;
      prefix = "🦄";
      unix_timestamp = "1555678501";
      text = "This is very ordinary text.";
      utils.send_to_db(user_id, prefix, unix_timestamp, text);
    });
  });

  describe("utils.get_activity_table", () => {
    it("should not throw and exception when selecting activities", () => {
      user_id = 1;
      utils.get_activity_table(user_id, result => {});
    });
  });
});
