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
module.exports = { createProduct };
