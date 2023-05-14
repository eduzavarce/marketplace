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
const findExistingUserReviewsByDealId = async (id, idReviewer) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM reviews
    WHERE idDeal = ? and idReviewer = ?;
    `;
  const [reviews] = await pool.query(sql, [id, idReviewer]);
  return reviews[0];
};

const findAllReviewsByUserId = async (id) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM reviews
    WHERE and idReviewed = ?;
    `;
  const [reviews] = await pool.query(sql, [id]);
  return reviews;
};
const findAvgReviewsByUserId = async (id) => {
  const pool = await getPool();
  const sql = `
    select idReviewed idUser ,avg(score) FROM reviews
    where  idReviewed = ?
    group by idReviewed

    `;
  const [reviews] = await pool.query(sql, [id]);
  return reviews;
};
const findAvgReviewsAsBuyerOrVendorByUserId = async (id) => {
  const pool = await getPool();
  const sql = `
  select idReviewer, idReviewed idUser, roleReviewed ,avg(score) FROM reviews
where  idReviewed = ?
group by roleReviewed
    `;
  const [reviews] = await pool.query(sql, [id]);
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
module.exports = {
  findReviewsByDealId,
  addReview,
  findExistingUserReviewsByDealId,
  findAllReviewsByUserId,
  findAvgReviewsByUserId,
  findAvgReviewsAsBuyerOrVendorByUserId,
};
