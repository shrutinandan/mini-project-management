const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects
} = require("../controllers/project.controller");

const {
  createTask,
  getTasksByProjectId,
} = require("../controllers/task.controller");



/*** View all project  ***/
router.get("/", getProjects);

/*** Create Project ***/
router.post("/", createProject);


/*** Create task ***/
router.post("/:projectId/tasks", createTask);

/*** List tasks by project ***/
router.get("/:projectId/tasks", getTasksByProjectId);



module.exports = router;
