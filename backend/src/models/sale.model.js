// const snakeize = require('snakeize');

const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales s
    JOIN sales_products sp ON s.id = sp.sale_id`,
  );
  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT
    s.date,
    sp.product_id AS productId,
    sp.quantity
  FROM sales s
  JOIN sales_products sp ON s.id = sp.sale_id
  WHERE sp.sale_id = ?`,
    [id],
  );
  return sale;
};

const insert = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (CURDATE())',
  );
  
  const promises = sale.map(async (product) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, product.productId, product.quantity],
    );
  });
  await Promise.all(promises);

  return insertId;
};

module.exports = {
  getAll,
  getById,
  insert,
};

module.exports = {
  getAll,
  getById,
  insert,
};
