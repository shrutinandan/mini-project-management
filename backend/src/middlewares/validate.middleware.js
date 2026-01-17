/**
 * validation.middleware.js
 *
 * Generic request body validation middleware for Express.
 *
 * This middleware validates incoming request payloads (`req.body`)
 * against a provided schema definition. It supports:
 * - Required field validation
 * - Enum (allowed values) validation
 *
 * The middleware is implemented as a higher-order function,
 * allowing different validation schemas to be applied per route.
 *
 * Usage example:
 *
 * router.post(
 *   "/tasks",
 *   validate({
 *     title: { required: true },
 *     status: { enum: ["pending", "in-progress", "completed"] }
 *   }),
 *   createTask
 * );
 *
 * If validation fails:
 * - Responds with HTTP 400 (Bad Request)
 * - Returns all validation errors in a single response
 *
 * If validation passes:
 * - Calls next() to continue request processing
 */

/**
 * Creates a validation middleware based on the provided schema.
 *
 * @param {Object} schema - Validation rules for request body fields
 * @returns {Function} Express middleware function
 */
module.exports = (schema) => (req, res, next) => {
  /**
   * Collects all validation errors.
   * We aggregate errors instead of failing fast,
   * so the client receives all issues in one response.
   */
  const errors = [];

  /**
   * Iterate through each field defined in the validation schema
   */
  for (const key in schema) {
    const rule = schema[key];      // Validation rules for the field
    const value = req.body[key];   // Value provided by the client

    /**
     * Required field validation
     * - Fails if value is missing or empty
     */
    if (rule.required && (value === undefined || value === "")) {
      errors.push(`${key} is required`);
    }

    /**
     * Enum validation
     * - Ensures the value belongs to a predefined set of allowed values
     */
    if (rule.enum && !rule.enum.includes(value)) {
      errors.push(`${key} must be one of ${rule.enum.join(", ")}`);
    }
  }

  /**
   * If any validation errors exist,
   * respond with 400 Bad Request and stop further processing.
   */
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  /**
   * Validation passed successfully.
   * Continue to the next middleware or controller.
   */
  next();
};
