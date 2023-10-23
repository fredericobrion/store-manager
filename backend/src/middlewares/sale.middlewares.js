const { createSaleSchema, updateSaleSchema } = require('../services/validations/saleSchema');
const saleModel = require('../models/sale.model');
const productModel = require('../models/product.model');

const generateErrorResponse = (res, message) => {
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
  const promises = req.body.map((sale) => {
    const saleId = productModel.getById(sale.productId);
    return saleId;
  });

  const idList = await Promise.all(promises);

  for (let index = 0; index < idList.length; index += 1) {
    if (idList[index] === undefined) {
      return res.status(404).json({ message: 'Product not found' });
    }
  }

  next();
};

const validateSaleId = async (req, res, next) => {
  let saleIdToTest;
  
  if (req.params.saleId) {
    saleIdToTest = req.params.saleId;
  } else {
    saleIdToTest = req.params.id;
  }

  const sale = await saleModel.getById(saleIdToTest);

  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

const validateUpdateSaleInput = (req, res, next) => {
  const { error } = updateSaleSchema.validate(req.body);

  if (error) {
    return generateErrorResponse(res, error.message);
  }

  next();
};

const validateProductId = async (req, res, next) => {
  const { productId } = req.params;

  const product = await productModel.getById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found in sale' });
  }

  next();
};

module.exports = {
  validateSaleInput,
  validateProductInDB,
  validateSaleId,
  validateUpdateSaleInput,
  validateProductId,
};