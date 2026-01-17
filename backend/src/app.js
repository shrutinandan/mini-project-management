/**
 * app.js
 *
 * Express application setup and configuration.
 *
 * Responsibilities:
 * - Initialize Express app
 * - Configure global middlewares (JSON parsing, CORS)
 * - Load in-memory data on startup
 * - Register API routes
 * - Register centralized error handling
 *
 * This file ONLY wires components together.
 * Business logic must live in routes, controllers, and services.
 */

const express = require("express");
const cors = require("cors");

// API routes
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

// Services used for bootstrapping in-memory data
const { loadProjects } = require("./services/project.service");
const { loadTasks } = require("./services/task.service");

// Error handling middlewares
const { notFound, errorHandler } = require("./middlewares/error.middleware");

// --------------------------------------------------
// Create Express application
// --------------------------------------------------
const app = express();

// --------------------------------------------------
// Global middlewares
// --------------------------------------------------

/**
 * Parse incoming JSON requests.
 * Must be registered before routes.
 */
app.use(express.json());

/**
 * Enable CORS for frontend communication.
 * NOTE:
 * - origin "*" is acceptable for development
 * - should be restricted in production
 */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

// --------------------------------------------------
// Application bootstrap
// --------------------------------------------------

/**
 * Load initial data into memory.
 * This is required before handling any API requests.
 *
 * ⚠️ If this app later uses a database,
 * these calls should be removed.
 */
loadProjects();
loadTasks();

/**
 * Disable ETag generation.
 * Prevents browser from receiving 304 responses
 * and avoids caching issues during development.
 */
app.set("etag", false);

// --------------------------------------------------
// API routes
// --------------------------------------------------

/**
 * Project-related APIs
 * Base path: /api/v1/projects
 */
app.use("/api/v1/projects", projectRoutes);

/**
 * Task-related APIs
 * Base path: /api/v1/tasks
 */
app.use("/api/v1/tasks", taskRoutes);

// --------------------------------------------------
// Error handling
// --------------------------------------------------

/**
 * Handle unknown routes (404).
 * This middleware is reached only if no route matched.
 */
app.use(notFound);

/**
 * Centralized error handler.
 * Handles all errors thrown from routes, services, or middleware.
 */
app.use(errorHandler);

// --------------------------------------------------
// Export application instance
// --------------------------------------------------

module.exports = app;
