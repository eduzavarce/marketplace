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

const updateProduct = async (key, value, id) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET ?=? WHERE id=?`;
  const [response] = await pool.query(sql, [key, value, id]);
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
