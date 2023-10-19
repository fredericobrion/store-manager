const { createProductSchema } = require('../services/validations/productSchema');

const generateErrorResponse = (res, message) => {
  console.log(message);
  if (message.includes('required')) {
    return res.status(400).json({ message });
  }
  if (message.includes('at least')) {
    return res.status(422).json({ message });
  }
};

const validateName = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);

  if (error) {
    return generateErrorResponse(res, error.message);
  }

  next();
};

module.exports = {
  validateName,
};
