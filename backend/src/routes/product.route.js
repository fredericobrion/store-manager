const route = require('express').Router();
const { productController } = require('../controllers');
const { validateName } = require('../middlewares/product.middlewares');

route.get('/', productController.getAll);
route.get('/:id', productController.getById);
route.post('/', validateName, productController.insert);

module.exports = route;