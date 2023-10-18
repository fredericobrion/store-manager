const { saleModel } = require('../models');

const { SUCCESSFUL, NOT_FOUND } = require('../utils/status');

const getAll = async () => {
  const sales = await saleModel.getAll();

  return { status: SUCCESSFUL, data: sales };
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);

  if (!sale.length) return { status: NOT_FOUND, data: { message: 'Sale not found' } };

  return { status: SUCCESSFUL, data: sale };
};

module.exports = {
  getAll,
  getById,
};