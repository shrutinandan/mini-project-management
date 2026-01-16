const express = require("express");
const cors = require("cors");

const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const { loadProjects } = require("./services/project.service");
const { loadTasks } = require("./services/task.service");

const app = express();
app.use(express.json());

// 🔥 CORS middleware
app.use(
  cors({
    origin: "*", // React app origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

// 🔥 Load in-memory data
loadProjects();
loadTasks();

// 🔥 Disable ETag (prevents 304) -> help in cache issue
app.set("etag", false);



app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Error handling
const { notFound, errorHandler } = require("./middlewares/error.middleware");
app.use(notFound);
// Centralized error handler
app.use(errorHandler);

app.use(express.json());


module.exports = app;
