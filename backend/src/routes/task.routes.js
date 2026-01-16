const express = require("express");
const router = express.Router();

const {

  updateTaskStatus,
  deleteTask
} = require("../controllers/task.controller");

const validate = require("../middlewares/validate.middleware");


// Routes
/*** Update task status ***/
router.put(
  "/:taskId",
  validate({
    status: {
      required: true,
      enum: ["pending", "in-progress", "completed"] //set of allowed values for the field.
    }
  }),
  updateTaskStatus
);

/*** Delete task ***/
router.delete("/:taskId", deleteTask);

module.exports = router;
