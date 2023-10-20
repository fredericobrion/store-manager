const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAll = async (_req, res) => {
  const { status, data } = await productService.getAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productService.getById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const { name } = req.body;

  const { status, data } = await productService.insert(name);

  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { status, data } = await productService.update(id, name);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
};