const allSalesFromDb = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-12-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 3,
    date: '2021-10-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const allSalesFromModel = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-12-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 3,
    date: '2021-10-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const salesByIdFromDb = [
  {
    saleId: 1,
    date: '2021-13-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-13-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const salesByIdFromModel = [
  {
    saleId: 1,
    date: '2021-13-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-13-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleIdFromDb = { insertId: 6 };
const saleIdFromModel = 6;
const saleToInsert = [
  { productId: 1, quantity: 2 },
  { productId: 2, quantity: 2 },
];

const rightProductsBody = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

const wrongQuantityProductsBody = [
  {
    productId: 1,
    quantity: -2,
  },
  {
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  allSalesFromDb,
  allSalesFromModel,
  salesByIdFromDb,
  salesByIdFromModel,
  saleIdFromDb,
  saleIdFromModel,
  saleToInsert,
  rightProductsBody,
  wrongQuantityProductsBody,
};
