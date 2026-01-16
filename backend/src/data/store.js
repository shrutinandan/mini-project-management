const fs = require("fs");
const path = require("path");

const projects = new Map();
const tasks = new Map();

const loadData = () => {
  
  const projectsPath = path.join(__dirname, "projects.json");
  const tasksPath = path.join(__dirname, "tasks.json");

  const projectsData = JSON.parse(fs.readFileSync(projectsPath));
  const tasksData = JSON.parse(fs.readFileSync(tasksPath));

  projectsData.forEach(p => projects.set(p.id, p));
  tasksData.forEach(t => tasks.set(t.id, t));

  console.log(" In-memory data loaded");
};

module.exports = {
  projects,
  tasks,
  loadData
};
