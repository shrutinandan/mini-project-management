const projectService = require("../services/project.service");

exports.createProject = (req, res, next) => {
  try {
    const project = projectService.createProject(req.body);
   
    return res.status(201).json({
      message: "Project created successfully",
      data: project
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjects = (req, res) => {
  res.json(projectService.getProjects());
};

