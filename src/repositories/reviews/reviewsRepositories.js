const getPool = require('../../infrastructure/database');

const findReviewsByDealId = async (id) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM reviews
    WHERE idDeal = ?;
    `;
  const [reviews] = await pool.query(sql, id);
  return reviews;
};
const addReview = async (
  idDeal,
  idProduct,
  idReviewer,
  idReviewed,
  roleReviewed,
  score,
  comments
) => {
  const pool = await getPool();
  const sql = `
    INSERT INTO reviews( idDeal,
        idProduct,
        idReviewer,
        idReviewed,
        roleReviewed,
        score,
        comments)VALUES(?,?,?,?,?,?,?)
    `;
  await pool.query(sql, [
    idDeal,
    idProduct,
    idReviewer,
    idReviewed,
    roleReviewed,
    score,
    comments,
  ]);
};
module.exports = { findReviewsByDealId, addReview };
