const { saleModel } = require('../models');

const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../utils/status');

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

module.exports = {
  getAll,
  getById,
  insert,
};