const { createSaleSchema } = require('../services/validations/saleSchema');
const saleModel = require('../models/sale.model');

const generateErrorResponse = (res, message) => {
  console.log(message);
  if (message.includes('required')) {
    return res.status(400).json({ message });
  }
  if (message.includes('greater')) {
    return res.status(422).json({ message });
  }
};

const validateSaleInput = (req, res, next) => {
  for (let index = 0; index < req.body.length; index += 1) {
    const { error } = createSaleSchema.validate(req.body[index]);
    if (error) {
      return generateErrorResponse(res, error.message);
    }
  }

  next();
};

const validateProductInDB = async (req, res, next) => {
  const ids = [];
  const promises = req.body.map(async (sale) => {
    const saleId = await saleModel.getById(sale.productId);
    ids.push(saleId);
  });

  await Promise.all(promises);

  for (let index = 0; index < ids.length; index += 1) {
    if (ids[index] === undefined) {
      return res.status(404).json({ message: 'Product not found' });
    }
  }

  next();
};

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;

  const sale = await saleModel.getById(id);

  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

module.exports = {
  validateSaleInput,
  validateProductInDB,
  validateSaleId,
};