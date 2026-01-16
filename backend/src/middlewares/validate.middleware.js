module.exports = (schema) => (req, res, next) => {
  const errors = [];

  for (const key in schema) {
    const rule = schema[key];
    const value = req.body[key];

    if (rule.required && (value === undefined || value === "")) {
      errors.push(`${key} is required`);
    }

    if (rule.enum && !rule.enum.includes(value)) {
      errors.push(`${key} must be one of ${rule.enum.join(", ")}`);
    }
  }

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  next();
};
