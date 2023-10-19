const allProductsFromDb = [
  { id: 1, name: 'Celular' },
  { id: 2, name: 'Computador' },
  { id: 3, name: 'Televisão' },
  { id: 4, name: 'Geladeira' },
];
const allProductsFromModel = [
  { id: 1, name: 'Celular' },
  { id: 2, name: 'Computador' },
  { id: 3, name: 'Televisão' },
  { id: 4, name: 'Geladeira' },
];

const ProductByIdFromDb = { id: 1, name: 'Celular' };
const ProductByIdFromModel = { id: 1, name: 'Celular' };

const productIdFromDb = { insertId: 6 };
const productIdFromModel = 6;

const newProductFromService = { id: 6, name: 'Microondas' };

const createdDriver = {
  status: 'CREATED',
  data: newProductFromService,
};

module.exports = {
  allProductsFromDb,
  allProductsFromModel,
  ProductByIdFromDb,
  ProductByIdFromModel,
  productIdFromDb,
  productIdFromModel,
  newProductFromService,
  createdDriver,
};
