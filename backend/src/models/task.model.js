const { randomUUID } = require("crypto");

class Task {
  constructor({ id, projectId, title, status, createdAt }) {
    this.id = id || randomUUID();
    this.projectId = projectId;
    this.title = title;
    this.status = status || "pending";
    this.createdAt = createdAt
  }
}

module.exports = Task; // ✅ Must export the class itself
