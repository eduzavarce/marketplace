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
const findDealById = async (id) => {
  const pool = await getPool();
  const sql = `SELECT * FROM deals WHERE id = ?`;
  const [deals] = await pool.query(sql, id);
  return deals[0];
};
const findDealDataByVendorId = async (id, idVendor) => {
  const pool = await getPool();
  const sql = `SELECT deals.*, vendor.username usernameVendor, vendor.email emailVendor, buyer.username usernameBuyer, buyer.email emailBuyer FROM deals 
  INNER JOIN products p ON p.id = deals.idProduct
  INNER JOIN users vendor ON vendor.id = ?
  INNER JOIN users buyer ON deals.idBuyer = buyer.id
  WHERE deals.id = ?`;
  const [data] = await pool.query(sql, [idVendor, id]);
  return data[0];
};
const findDealDataByBuyerId = async (id, idBuyer) => {
  const pool = await getPool();
  const sql = `SELECT deals.*, vendor.username usernameVendor, vendor.email emailVendor, vendor.id idVendor, buyer.username usernameBuyer, buyer.email emailBuyer FROM deals 
  INNER JOIN products p ON p.id = deals.idProduct
  INNER JOIN users vendor ON vendor.id = vendor.id
  INNER JOIN users buyer ON deals.idBuyer = ?
  WHERE deals.id = ?`;
  const [data] = await pool.query(sql, [idBuyer, id]);
  return data[0];
};
const updateDealStatus = async (id, status, timestamp) => {
  const pool = await getPool();
  const sql = `UPDATE deals
  SET status = ?, updatedAt = ?
  WHERE id = ?`;
  await pool.query(sql, [status, timestamp, id]);
};
const addDealMessage = async (
  idDeal,
  bodyIdVendor,
  idBuyer,
  message,
  bodyStatus
) => {
  const pool = await getPool();
  const sql = `
  INSERT INTO dealsmessages(idDeal, idSender, idRecipient, message, status)VALUES(?, ?, ?, ?, ?)`;
  await pool.query(sql, [idDeal, bodyIdVendor, idBuyer, message, bodyStatus]);
};
const findAllDealsByUserId = async (id) => {
  const pool = await getPool();
  const sql = `
  SELECT deals.status status, deals.id idDeal, idBuyer, products.name, products.idUser idVendor, vendor.username usernameVendor FROM deals
INNER JOIN products ON products.id = deals.idProduct
INNER JOIN users vendor ON vendor.id = products.idUser
WHERE idBuyer = ?
ORDER BY status
  `;
  const [products] = await pool.query(sql, id);
  return products;
};
module.exports = {
  findBuyRequestData,
  createDeal,
  findDealById,
  findDealDataByVendorId,
  findDealDataByBuyerId,
  updateDealStatus,
  addDealMessage,
  findAllDealsByUserId,
};
