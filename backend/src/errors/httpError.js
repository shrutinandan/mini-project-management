class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends HttpError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

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
