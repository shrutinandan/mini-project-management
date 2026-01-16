const fs = require("fs");
const path = require("path");
const Project = require("../models/project.model");

const dataPath = path.join(__dirname, "../data/projects.json");

// 🔥 In-memory store
let projects = [];

/**
 * Load projects from JSON ONCE at startup
 */
const loadProjects = () => {
  if (!fs.existsSync(dataPath)) {
    console.warn("⚠️ projects.json not found");
    projects = [];
    return;
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const parsed = JSON.parse(raw);

  projects = parsed.map(p => new Project(p));
  console.log("✅ Projects loaded:", projects.length, parsed);
};

/**
 * Create project (in-memory only)
 */
const createProject = ({ name, description }) => {
  if (!name) {
    const err = new Error("Project name is required");
    err.status = 400;
    throw err;
  }

  const project = new Project({ name, description });
  projects.push(project);

  return project;
};

/**
 * Read projects from memory
 */
const getProjects = () => projects;

const getProjectById = id =>
  projects.find(project => project.id === id);

module.exports = {
  loadProjects,
  createProject,
  getProjects,
  getProjectById
};
