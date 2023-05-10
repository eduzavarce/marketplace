const getPool = require('../../infrastructure/database');

const findBuyRequestData = async (idProduct) => {
  const pool = await getPool();
  const sql = `
        SELECT pr.*, u.username usernameVendor, u.email emailVendor, u.id idVendor, u.isActive isActiveVendor
        FROM products pr
        INNER JOIN users u ON u.id = pr.idUser
        WHERE pr.id = ?
    `;
  const [product] = await pool.query(sql, idProduct);
  return product[0];
};

const createDeal = async (params) => {
  const pool = await getPool();
  const sql =
    'INSERT INTO deals (idBuyer, idProduct, status) VALUES (? , ? , ?)';
  const [insert] = await pool.query(sql, params);
  const sql2 = `UPDATE products SET isActive = false WHERE id= ?`;
  const [, idProduct] = params;
  await pool.query(sql2, idProduct);

  return insert.insertId;
};
module.exports = { findBuyRequestData, createDeal };
