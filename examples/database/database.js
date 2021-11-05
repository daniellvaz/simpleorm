const Client = require("../..");

const database = new Client("postgres", {
  host: "localhost",
  port: 5432,
  password: "123456",
  user: "postgres",
  database: "teste",
});

module.exports = database;
