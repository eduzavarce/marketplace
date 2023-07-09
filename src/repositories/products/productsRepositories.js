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
  city,
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
    city,
    locationLat,
    locationLong,
    idUser,
    status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

  const [response] = await pool.query(sql, [
    name,
    description,
    price,
    category,
    keywords,
    region,
    country,
    address,
    city,
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
  SELECT * FROM products
  WHERE isActive = true`;

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
  city,
  locationLat,
  locationLong,
  status,
  id
) => {
  const pool = await getPool();
  const sql = `
  UPDATE products SET
  name=? ,description=? ,price=?,category=?,keywords=?,region=?, country=?, address=?, city=?,locationLat=?,locationLong=?,  status=? WHERE id=?;`;
  await pool.query(sql, [
    name,
    description,
    price,
    category,
    keywords,
    region,
    country,
    address,
    city,
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
  const [products] = await pool.query(sql, [id]);
  return products;
};

const findProductByUserId = async (idUser) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM products
    WHERE idUser = ? `;
  const [products] = await pool.query(sql, idUser);
  return products;
};
const findProductForResponsesByUserId = async (idUser) => {
  const pool = await getPool();
  const sql = `
    SELECT id, name, description, price, category, keywords, status, isActive, city  FROM products
    WHERE idUser = ? `;
  const [products] = await pool.query(sql, idUser);
  return products;
};

const findProductsByAllQuerys = async (name, category, order, lat, long) => {
  const pool = await getPool();
  let sql = `
  SELECT *, 
  (
    ST_Distance_Sphere(
      point(locationLat, locationLong), 
      point(?, ?)
    )
  ) distance  
  FROM products 
  WHERE isActive = true`;
  const values = [lat, long];
  let clause = ' AND';
  if (name !== '' && name && name !== 'null') {
    sql += ` ${clause} name LIKE ? OR description LIKE ?`;
    values.push(`%${name}%`, `%${name}%`);
    clause = 'AND';
  }
  if (category !== 'undefined' && category && category !== 'All') {
    sql += ` ${clause} category LIKE ?`;
    values.push(category);
    clause = ' AND';
  }
  if (order === 'ASC') {
    sql += ` ORDER BY price ASC`;
  } else if (order === 'DESC') {
    sql += ` ORDER BY price DESC`;
  } else if (order === 'Location') {
    sql += ` ORDER BY distance ASC`;
  }
  console.log(sql, values);

  const [products] = await pool.query(sql, values);
  return products;
};
const findProductByCity = async (city) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM products
    WHERE city LIKE ? and isActive = true`;
  const [products] = await pool.query(sql, '%' + city + '%');
  return products;
};

const findProductByName = async (name) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM products
    WHERE name LIKE ? and isActive = true`;
  const [products] = await pool.query(sql, '%' + name + '%');
  return products;
};
const findProductByCategory = async (category) => {
  const pool = await getPool();
  const sql = `
    SELECT * FROM products
    WHERE category = ? and isActive = true`;
  const [products] = await pool.query(sql, category);
  return products;
};
const sortProductByPriceAsc = async () => {
  const pool = await getPool();
  const sql = `SELECT * FROM products WHERE isActive = true ORDER BY price ASC  `;
  const [products] = await pool.query(sql);
  return products;
};
const sortProductByPriceDesc = async () => {
  const pool = await getPool();
  const sql = `SELECT * FROM products WHERE isActive = true ORDER BY price DESC `;
  const [products] = await pool.query(sql);
  return products;
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
const findImagesByIdProduct = async (id) => {
  const pool = await getPool();
  const sql = `
  SELECT fileName, isDefault FROM productImages
  WHERE idProduct =?
  `;
  const [images] = await pool.query(sql, id);
  return images;
};
const sortProductsByLocation = async (lat, long) => {
  const pool = await getPool();
  const sql = ` 
  SELECT
  *, (
    ST_Distance_Sphere(
      point(locationLat, locationLong), 
      point(?, ?)
    )
  ) distance   
FROM
  products
WHERE locationLat IS NOT NULL AND  isActive = true
ORDER BY distance ASC
  `;

  const [products] = await pool.query(sql, [lat, long]);
  console.log(products);
  return products;
};
const findProductForLocationSearch = async () => {
  const pool = await getPool();
  const sql = ` SELECT id, name, description, price, category, keywords, idUser, region, address, country, locationLat lat , locationLong "long", status FROM products WHERE isActive = true`;

  const [products] = await pool.query(sql);
  return products;
};
const findChatIdbyUserAndProductId = async (idUser, idProduct) => {
  const pool = await getPool();
  const sql = `
  SELECT pc.*, vendor.username usernameVendor, vendor.email emailVendor, vendor.avatar avatarVendor, buyer.username usernameBuyer, buyer.email emailBuyer, buyer.avatar avatarBuyer, p.name nameProduct FROM productChats pc
  INNER JOIN users vendor on pc.idVendor = vendor.id
  INNER JOIN users buyer on pc.idBuyer = buyer.id
  INNER JOIN products p on p.id = pc.idProduct
  WHERE  ? in (pc.idBuyer, pc.idVendor) and pc.idProduct = ?
  
  `;
  const [messages] = await pool.query(sql, [idUser, idProduct]);
  return messages[0];
};
const findChatsbyUserId = async (idUser) => {
  const pool = await getPool();
  const sql = `
  SELECT pc.*, vendor.username usernameVendor, vendor.email emailVendor, vendor.avatar avatarVendor, buyer.username usernameBuyer, buyer.email emailBuyer, buyer.avatar avatarBuyer, p.name nameProduct FROM productChats pc
  INNER JOIN users vendor on pc.idVendor = vendor.id
  INNER JOIN users buyer on pc.idBuyer = buyer.id
  INNER JOIN products p on p.id = pc.idProduct
  WHERE  ? in (pc.idBuyer, pc.idVendor) 
  
  `;
  const [messages] = await pool.query(sql, [idUser]);
  return messages;
};
const findLatestMessageContentByChatId = async (id) => {
  const pool = await getPool();
  const sql = `
  SELECT * FROM productMessages
   WHERE idProductChat = ?
  ORDER BY id DESC
  
  `;
  const [messages] = await pool.query(sql, id);
  return messages;
};
const createNewChat = async (idProduct, idUser, idVendor) => {
  const pool = await getPool();
  const sql = `
  INSERT INTO productchats (idProduct, idBuyer, idVendor) VALUES(?, ?, ?)
  `;
  const [chat] = await pool.query(sql, [idProduct, idUser, idVendor]);

  return chat.insertId;
};
const createNewChatMessage = async (idChat, idUser, message) => {
  const pool = await getPool();
  const sql = `
  INSERT INTO productmessages (idProductChat, idSender, message) VALUES(?, ?, ?)
  `;
  const [newMessage] = await pool.query(sql, [idChat, idUser, message]);

  return newMessage.insertId;
};

module.exports = {
  createNewChatMessage,
  findProductByCity,
  findProductById,
  createProduct,
  insertLocationName,
  insertLocation,
  findAllProducts,
  updateProduct,
  reactivateProductById,
  insertProductImageName,
  findProductForLocationSearch,
  findProductByName,
  findProductByCategory,
  sortProductByPriceAsc,
  sortProductByPriceDesc,
  findImagesByIdProduct,
  findProductByUserId,
  findProductForResponsesByUserId,
  sortProductsByLocation,
  findProductsByAllQuerys,
  findLatestMessageContentByChatId,
  findChatIdbyUserAndProductId,
  createNewChat,
  findChatsbyUserId,
};
