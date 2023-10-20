const { createProductSchema } = require('../services/validations/productSchema');
const productModel = require('../models/product.model');

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

const validateProductId = async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateName,
  validateProductId,
};
