const fs = require("fs");
const path = require("path");
const Task = require("../models/task.model");

// Path to tasks JSON file
const dataPath = path.join(__dirname, "../data/tasks.json");

// 🔥 In-memory store
let tasks = [];

/**
 * Load tasks from JSON ONCE at startup
 */
const loadTasks = () => {
  if (!fs.existsSync(dataPath)) {
    console.warn("⚠️ tasks.json not found");
    tasks = [];
    return;
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const parsed = JSON.parse(raw);

  tasks = parsed.map(t => new Task(t));
  console.log("✅ Tasks loaded:", tasks.length);
};

/**
 * Create task (in-memory only)
 */
const createTask = ({ projectId, title, status = "pending",createdAt }) => {
  if (!title) {
    const err = new Error("Task title is required");
    err.status = 400;
    throw err;  // ✅ throw error
  }

  const task = new Task({ projectId, title, status, createdAt });
  tasks.push(task);

  return task;
};


/**
 * Get all tasks for a project
 */
const getTasksByProjectId = (projectId) => {
  if (!projectId) {
    const err = new Error("Project Id is required");
    err.status = 400;
    throw err;  // ✅ throw error
  }
  return tasks.filter(t => t.projectId === projectId);
}

/**
 * Get task by ID
 */
const getTaskById = (taskId) =>
  tasks.find(t => t.id === taskId);
/**
 * Update task status
 */
const updateTaskStatus = (taskId, status) => {
  const task = getTaskById(taskId);
  if (!task) {
    const error = new Error("Task not found");
    error.status = 404;
    throw error;  // ✅ throw error
  }

  task.status = status;
  return task;
};

/**
 * Delete a task
 */
const deleteTask = (taskId) => {
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error; // ✅ throw error
  }

  return tasks.splice(index, 1)[0];
};


module.exports = {
  loadTasks,
  createTask,
  getTasksByProjectId,
  getTaskById,
  updateTaskStatus,
  deleteTask
};
