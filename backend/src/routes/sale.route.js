const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/', saleController.getAll);
route.get('/:id', saleController.getById);

module.exports = route;
