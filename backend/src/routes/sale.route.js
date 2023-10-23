const route = require('express').Router();
const { saleController } = require('../controllers');
const {
  validateSaleInput,
  validateProductInDB,
  validateSaleId,
  validateUpdateSaleInput,
  validateProductId,
} = require('../middlewares/sale.middlewares');

route.get('/', saleController.getAll);
route.get('/:id', saleController.getById);
route.post('/', validateSaleInput, validateProductInDB, saleController.insert);
route.delete('/:id', validateSaleId, saleController.deleteSale);
route.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSaleInput,
  validateProductId,
  validateSaleId,
  saleController.updateSale,
);

module.exports = route;
