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

module.exports = {
  getAll,
  getById,
};
