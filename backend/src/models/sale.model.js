const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales_products',
  );
  return sales;  
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    'SELECT * FROM sales_products WHERE id=?',
    [id],
  );
  return sale;
};

module.exports = {
  getAll,
  getById,
};
