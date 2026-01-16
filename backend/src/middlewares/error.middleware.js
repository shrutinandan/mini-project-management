const { HttpError } = require("../errors/httpError");

const notFound = (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = {
  notFound,
  errorHandler
};
