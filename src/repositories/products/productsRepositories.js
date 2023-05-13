const getPool = require('../../infrastructure/database');
const createProduct = async (
  name,
  description,
  price,
  category,
  keywords,
  region,
  country,
  address,
  locationLat,
  locationLong,
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
    region,
    country,
    address,
    locationLat,
    locationLong,
    idUser,
    status) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

  const [response] = await pool.query(sql, [
    name,
    description,
    price,
    category,
    keywords,
    region,
    country,
    address,
    locationLat,
    locationLong,
    idUser,
    status,
  ]);
  return response.insertId;
};

const findAllProducts = async () => {
  const pool = await getPool();
  const sql = `
  SELECT * FROM products`;
  const [products] = await pool.query(sql);

  return products;
};

const updateProduct = async (
  name,
  description,
  price,
  category,
  keywords,
  region,
  country,
  address,
  locationLat,
  locationLong,
  status,
  id
) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET
  name=? ,description=? ,price=?,category=?,keywords=?,region=?, country=?, address=?,locationLat=?,locationLong=?,  status=? WHERE id=?;`;
  await pool.query(sql, [
    name,
    description,
    price,
    category,
    keywords,
    region,
    country,
    address,
    locationLat,
    locationLong,
    status,
    id,
  ]);
};

const insertLocationName = async (locationName, id) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET locationName=? WHERE id=?`;
  const [response] = await pool.query(sql, [locationName, id]);
  return response;
};

const insertLocation = async (locationLat, locationLong, id) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET locationLat=? , locationLong=? WHERE id=?`;
  const [response] = await pool.query(sql, [locationLat, locationLong, id]);
  return response;
};

const findProductById = async (id) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM products
    WHERE id = ? `;
  const [products] = await pool.query(sql, id);
  return products[0];
};
const reactivateProductById = async (id, active) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET isActive = ? WHERE id= ?`;
  await pool.query(sql, [active, id]);
  console.log(active);
};
const insertProductImageName = async (idProduct, fileName) => {
  const pool = await getPool();
  const sql = `INSERT INTO productImages(fileName, idProduct)VALUES (?, ?)`;
  await pool.query(sql, [fileName, idProduct]);
};

module.exports = {
  findProductById,
  createProduct,
  insertLocationName,
  insertLocation,
  findAllProducts,
  updateProduct,
  reactivateProductById,
  insertProductImageName,
};
