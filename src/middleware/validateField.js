const validateField = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const { details } = error;
    const message = details.map((detail) => detail.message).join(',');
    return res.status(422).json({ code: 1, error: message });
  }

  return next();
};

export default validateField;
