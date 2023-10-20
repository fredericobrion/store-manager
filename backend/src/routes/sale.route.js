const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/', saleController.getAll);
route.get('/:id', saleController.getById);
route.post('/', saleController.insert);

module.exports = route;
