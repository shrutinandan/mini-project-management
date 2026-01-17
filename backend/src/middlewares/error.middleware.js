/**
 * error.middleware.js
 *
 * Centralized error-handling middleware for the Express application.
 *
 * Responsibilities:
 * 1. Handle unknown routes (404 - Not Found)
 * 2. Catch and format application errors in a consistent structure
 * 3. Separate expected (custom) errors from unexpected server errors
 *
 * This file should be registered AFTER all routes in the Express app:
 *
 * app.use(notFound);
 * app.use(errorHandler);
 */

const { HttpError } = require("../errors/httpError");

/**
 * Handles requests to unknown or undefined routes.
 *
 * This middleware is triggered when no route matches the request.
 * It returns a standard 404 response.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    error: "Route not found"
  });
};

/**
 * Global error-handling middleware.
 *
 * This middleware captures all errors thrown in the application
 * and sends a clean, consistent error response to the client.
 *
 * Behavior:
 * - If the error is a known HttpError:
 *   → Use its status code and message
 * - Otherwise:
 *   → Log the error and return a generic 500 response
 *
 * IMPORTANT:
 * Error-handling middleware must have 4 parameters
 * (err, req, res, next) to be recognized by Express.
 *
 * @param {Error} err - Thrown error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  /**
   * Handle known application errors
   */
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  /**
   * Log unexpected errors for debugging and monitoring
   */
  console.error(err);

  /**
   * Fallback for unhandled or unknown errors
   */
  res.status(500).json({
    error: "Internal server error"
  });
};

module.exports = {
  notFound,
  errorHandler
};
