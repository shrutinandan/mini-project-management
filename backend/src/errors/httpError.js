/**
 * httpError.js
 *
 * Defines custom HTTP error classes used across the application.
 *
 * Purpose:
 * - Provide a consistent structure for application-level errors
 * - Attach HTTP status codes to errors
 * - Enable centralized error handling in middleware
 *
 * These errors are intended to be:
 * - Thrown from controllers, services, or middlewares
 * - Caught and formatted by the global error handler
 *
 * Example usage:
 *   throw new NotFoundError("Project not found");
 *   throw new BadRequestError("Invalid input data");
 */

/**
 * Base HTTP Error class.
 *
 * Extends the native JavaScript Error object by
 * adding an HTTP status code.
 *
 * All custom HTTP errors should extend this class.
 */
class HttpError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {number} statusCode - HTTP status code associated with the error
   */
  constructor(message, statusCode) {
    super(message);

    // Set error name to class name for easier debugging
    this.name = this.constructor.name;

    // HTTP status code (e.g., 400, 404, 500)
    this.statusCode = statusCode;

    // Maintains proper stack trace (important for debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 - Not Found Error
 *
 * Used when a requested resource does not exist.
 *
 * Example:
 *   throw new NotFoundError("Task not found");
 */
class NotFoundError extends HttpError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

/**
 * 400 - Bad Request Error
 *
 * Used when the client sends invalid or malformed data.
 *
 * Example:
 *   throw new BadRequestError("Project name is required");
 */
class BadRequestError extends HttpError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

module.exports = {
  HttpError,
  NotFoundError,
  BadRequestError
};
