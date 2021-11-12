const Client = require("../../src/lib/Client");

class User extends Client {
  constructor() {
    super(null, null, "users");
  }
}

const users = new User();

module.exports = users;
