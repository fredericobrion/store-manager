const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { data, status } = await saleService.getAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { data, status } = await saleService.getById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const { body } = req;

  const { data, status } = await saleService.insert(body);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { status } = await saleService.deleteSale(id);

  return res.status(mapStatusHTTP(status)).json();
};

const updateSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { data, status } = await saleService.updateSale(saleId, productId, quantity);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteSale,
  updateSale,
};
