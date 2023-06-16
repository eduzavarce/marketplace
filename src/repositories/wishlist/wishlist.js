const getPool = require('../../infrastructure/database');

const getWishlist = async (idUser) => {
  const pool = await getPool();

  const sql = `SELECT w.* FROM wishlist w
  INNER JOIN products p ON p.id = w.idProducts
   WHERE w.idUsers=? and w.isActive = true and p.isActive = true `;

  const [wishlist] = await pool.query(sql, idUser);

  return wishlist;
};
const checkIfInWishlist = async (idUser, idProduct) => {
  const pool = await getPool();
  const sql = `SELECT * FROM wishlist WHERE idUsers=? AND idProducts=?`;
  const [items] = await pool.query(sql, [idUser, idProduct]);
  return items[0];
};
const addToWishlist = async (idUser, idProduct) => {
  const pool = await getPool();

  const sql =
    'INSERT INTO wishlist(idUsers, idProducts, isActive) VALUES(?, ?, true)';

  const [insert] = await pool.query(sql, [idUser, idProduct]);

  return insert.insertId;
};
const changeWishlistStatus = async (id, status) => {
  const pool = await getPool();

  const sql = 'UPDATE wishlist SET isActive= ? WHERE id=?';

  const [update] = await pool.query(sql, [status, id]);

  return update;
};

module.exports = {
  getWishlist,
  addToWishlist,
  changeWishlistStatus,
  checkIfInWishlist,
};
