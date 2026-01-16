const { v4: uuidv4 } = require("uuid");

class Project {
  constructor({ id, name, description = "" }) {
    this.id = id? id : uuidv4();
    this.name = name;
    this.description = description;
  }
}

module.exports = Project;
