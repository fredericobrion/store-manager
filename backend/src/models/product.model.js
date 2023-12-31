const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id=?',
    [id],
  );
  console.log(product);
  return product;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE products SET name=? WHERE id=?',
    [name, id],
  );
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id=?',
    [id],
  );
};

const getByName = async (name) => {
  const formattedName = `%${name}%`;
  const [product] = await connection.execute(
    `SELECT * FROM products
    WHERE name LIKE ?`,
    [formattedName],
  );
  return product;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteProduct,
  getByName,
};
