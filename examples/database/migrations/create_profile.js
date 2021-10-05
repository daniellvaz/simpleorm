const database = require("../database");

module.exports = {
  async up() {
    await database.createTable("profile", true, [
      {
        name: "description",
        type: "string",
      },
      {
        name: "user_id",
        type: "integer unsigned",
        foreignkey: [
          {
            foreign: "user_id",
            references: "id",
            referenciedTable: "users",
          },
        ],
      },
    ]);
    return true;
  },

  async down() {
    await database.dropTable("profile");
    return;
  },
};
