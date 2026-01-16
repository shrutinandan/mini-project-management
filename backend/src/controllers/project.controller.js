const projectService = require("../services/project.service");

exports.createProject = (req, res, next) => {
  try {
    const project = projectService.createProject(req.body);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getProjects = (req, res) => {
  res.json(projectService.getProjects());
};

