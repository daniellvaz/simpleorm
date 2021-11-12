const Client = require("../../src/lib/Client");

class Project extends Client {
  constructor() {
    super(null, null, "projects");
  }
}

const projects = new Project();

module.exports = projects;
