const route = require('express').Router();
const { saleController } = require('../controllers');
const { validateSaleInput, validateProductInDB } = require('../middlewares/sale.middlewares');

route.get('/', saleController.getAll);
route.get('/:id', saleController.getById);
route.post('/', validateSaleInput, validateProductInDB, saleController.insert);

module.exports = route;
