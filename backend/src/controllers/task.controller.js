const taskService = require("../services/task.service");

exports.createTask = async (req, res) => {
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
    console.error("Create task failed:", error);

    return res.status(500).json({
      message: "Failed to create task"
    });
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

exports.deleteTask = (req, res, next) => {
  try {
    const { taskId } = req.params;

    const deletedTask = taskService.deleteTask(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
      data: {
        id: taskId
      }
    });
  } catch (err) {
    next(err);
  }
};

