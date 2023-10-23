const { saleModel } = require('../models');

const { SUCCESSFUL, NOT_FOUND, CREATED, NO_CONTENT } = require('../utils/status');

const getAll = async () => {
  const sales = await saleModel.getAll();

  return { status: SUCCESSFUL, data: sales };
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);

  if (!sale.length) return { status: NOT_FOUND, data: { message: 'Sale not found' } };

  return { status: SUCCESSFUL, data: sale };
};

const insert = async (sale) => {
  const id = await saleModel.insert(sale);

  const response = {
    id,
    itemsSold: [...sale],
  };

  return { status: CREATED, data: response };
};

const deleteSale = async (id) => {
  await saleModel.deleteSale(id);

  return { status: NO_CONTENT };
};

const updateSale = async (saleId, productId, quantity) => {
  await saleModel.updateSale(saleId, productId, quantity);

  const updatedSale = await saleModel.getByIdWithSaleId(saleId);
  const updatedProduct = updatedSale.find((product) => product.productId === Number(productId));

  return { status: SUCCESSFUL, data: updatedProduct };
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteSale,
  updateSale,
};