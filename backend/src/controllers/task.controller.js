const taskService = require("../services/task.service");

exports.createTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title } = req.body;

    const task = await taskService.createTask({
      title,
      projectId,
      status: "pending",
      createdAt: new Date()
    });

    return res.status(201).json({
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    next(error); // ✅ forward to centralized handler
  }
};


exports.getTasksByProjectId = (req, res) => {
  const tasks = taskService.getTasksByProjectId(req.params.projectId);
  res.json(tasks);
};

exports.updateTaskStatus = (req, res, next) => {
  try {
    const task = taskService.updateTaskStatus(
      req.params.taskId,
      req.body.status
    );
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await taskService.deleteTask(taskId);

    return res.status(200).json({
      message: "Task deleted successfully",
      data: {
        id: taskId
      }
    });
  } catch (err) {
    next(err); // ✅ forward all errors
  }
};

