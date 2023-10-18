// const productModel = require('../models/product.model');
const { productModel } = require('../models');

const { SUCCESSFUL, NOT_FOUND } = require('../utils/status');

const getAll = async () => {
  const products = await productModel.getAll();

  return { status: SUCCESSFUL, data: products };
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  console.log(product);

  if (!product) return { status: NOT_FOUND, data: { message: 'Product not found' } };

  return { status: SUCCESSFUL, data: product };
};

module.exports = {
  getAll,
  getById,
};
