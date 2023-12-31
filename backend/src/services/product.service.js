// const productModel = require('../models/product.model');
const { productModel } = require('../models');

const { SUCCESSFUL, NOT_FOUND, CREATED, NO_CONTENT } = require('../utils/status');

const getAll = async () => {
  const products = await productModel.getAll();

  return { status: SUCCESSFUL, data: products };
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) return { status: NOT_FOUND, data: { message: 'Product not found' } };

  return { status: SUCCESSFUL, data: product };
};

const insert = async (name) => {
  const id = await productModel.insert(name);

  const response = {
    id,
    name,
  };

  return { status: CREATED, data: response };
};

const update = async (id, name) => {
  await productModel.update(id, name);

  const response = {
    id: Number(id),
    name,
  };

  return { status: SUCCESSFUL, data: response };
};

const deleteProduct = async (id) => {
  await productModel.deleteProduct(id);

  return { status: NO_CONTENT };
};

const getByName = async (name) => {
  const products = name ? await productModel.getByName(name) : await productModel.getAll();

  return { status: SUCCESSFUL, data: products };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteProduct,
  getByName,
};
