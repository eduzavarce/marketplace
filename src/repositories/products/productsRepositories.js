const getPool = require('../../infrastructure/database');

const { throwError } = require('../../middlewares');

const createProduct = async (
  name,
  description,
  price,
  category,
  keywords,
  idUser,
  status
) => {
  const pool = await getPool();
  const sql = `
  INSERT INTO products(
    name,
    description,
    price,
    category,
    keywords,
    idUser,
    status) 
    VALUES (?,?,?,?,?,?,?)`;

  const [response] = await pool.query(sql, [
    name,
    description,
    price,
    category,
    keywords,
    idUser,
    status,
  ]);
  return response.insertId;
};

const updateProduct = async (
  name,
  description,
  price,
  category,
  keywords,
  status,
  id
) => {
  const pool = await getPool();
  if (name) {
    const sql = `
  UPDATE products SET name=? WHERE id=?`;
    const [response] = await pool.query(sql, [name, id]);
  }
  if (description) {
    const sql = `
UPDATE products SET description=? WHERE id=?`;
    const [response] = await pool.query(sql, [description, id]);
  }
  if (price) {
    const sql = `
UPDATE products SET price=? WHERE id=?`;
    const [response] = await pool.query(sql, [price, id]);
  }
  if (category) {
    const sql = `
UPDATE products SET category=? WHERE id=?`;
    const [response] = await pool.query(sql, [category, id]);
  }
  if (keywords) {
    const sql = `
UPDATE products SET keywords=? WHERE id=?`;
    const [response] = await pool.query(sql, [keywords, id]);
  }
  if (status) {
    const sql = `
UPDATE products SET status=? WHERE id=?`;
    const [response] = await pool.query(sql, [status, id]);
  }
};

const insertLocationName = async (locationName, id) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET locationName=? WHERE id=?`;
  const [response] = await pool.query(sql, [locationName, id]);
};

const insertLocation = async (locationLat, locationLong, id) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET locationLat=? , locationLong=? WHERE id=?`;
  const [response] = await pool.query(sql, [locationLat, locationLong, id]);
};

const findProductById = async (id) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM products
    WHERE id = ? `;
  const [products] = await pool.query(sql, id);
  return products[0];
};

module.exports = {
  findProductById,
  createProduct,
  insertLocationName,
  insertLocation,
  updateProduct,
};
