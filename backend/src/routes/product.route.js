const route = require('express').Router();
const { productController } = require('../controllers');
const { validateName, validateProductId } = require('../middlewares/product.middlewares');

route.get('/', productController.getAll);
route.get('/:id', productController.getById);
route.post('/', validateName, productController.insert);
route.put('/:id', validateName, validateProductId, productController.update);
route.delete('/:id', validateProductId, productController.deleteProduct);

module.exports = route;