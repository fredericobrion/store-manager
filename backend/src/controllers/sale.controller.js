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

module.exports = {
  getAll,
  getById,
};
