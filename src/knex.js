const config = require("./knexfile")["production"];
module.exports = require("knex")(config);
