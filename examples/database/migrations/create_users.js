const database = require("../database");

module.exports = {
  async up() {
    await database.createTable("users", true, [
      {
        name: "name",
        type: "string",
      },
      {
        name: "email",
        type: "string",
      },
      {
        name: "password",
        type: "string",
      },
    ]);
    return true;
  },

  async down() {
    await database.dropTable("users");
    return;
  },
};
