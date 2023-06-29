require('dotenv').config();
const mysql = require('mysql2/promise');

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

let pool;

const getPool = async () => {
  if (!pool) {
    pool = await mysql.createPool({
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      timezone: 'Z',
    });
  }
  return pool;
};

const createNewDatabase = async () => {
  try {
    const pool = await getPool();
    console.log('Creating DB');
    await pool.query(`CREATE database IF NOT EXISTS marketplace`);
    await pool.query(`USE marketplace`);
    console.log('Deleting tables');
    await pool.query(`DROP TABLE IF EXISTS complaintImages`);
    await pool.query(`DROP TABLE IF EXISTS complaints`);
    await pool.query(`DROP TABLE IF EXISTS wishlist`);
    await pool.query(`DROP TABLE IF EXISTS reviews`);
    await pool.query(`DROP TABLE IF EXISTS blacklists`);
    await pool.query(`DROP TABLE IF EXISTS follows`);
    await pool.query(`DROP TABLE IF EXISTS dealsMessages`);
    await pool.query(`DROP TABLE IF EXISTS deals`);
    await pool.query('DROP TABLE IF EXISTS productImages');
    await pool.query('DROP TABLE IF EXISTS products');
    await pool.query('DROP TABLE IF EXISTS users');
    console.log('Creating Tables');
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        name VARCHAR(45) ,
        lastName VARCHAR(45) ,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(45) ,
        createdAt DATETIME DEFAULT NOW(),
        verificationCode VARCHAR(64) NOT NULL,
        isActive BOOLEAN DEFAULT true,
        role ENUM('root', 'admin', 'user') DEFAULT 'user',
        verifiedAt DATETIME ,
        bio VARCHAR(255) ,
        address VARCHAR(255) ,
        city VARCHAR(255) ,
        region VARCHAR(45) ,
        country VARCHAR(45) ,
        locationLat VARCHAR(45) ,
        locationLong VARCHAR(45) ,
        type ENUM('store', 'regular') ,
        taxNumber VARCHAR(45) 
       
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS products (
        id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category ENUM('music',
        'video',
        'photography',
        'gaming',
        'computer',
        'collector',
        'television',
        'cloth',
        'others') NOT NULL,
        keywords VARCHAR(200) ,
        idUser INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT now(),
        updatedAt DATETIME ,
        isActive BOOLEAN DEFAULT true,
        address VARCHAR(200)  ,
        city VARCHAR(200)  ,
        region VARCHAR(45) ,
        country VARCHAR(45) ,
        locationLat VARCHAR(45)  ,
        locationLong VARCHAR(45)  ,
        status ENUM('new', 'used', 'refurbished') NOT NULL,
        FOREIGN KEY (idUser)
        REFERENCES users (id)
        ON DELETE CASCADE
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS productImages (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        fileName VARCHAR(45) NOT NULL,
        idProduct INT UNSIGNED NOT NULL,
        isDefault BOOLEAN ,
        FOREIGN KEY (idProduct)
        REFERENCES products (id)
        ON DELETE CASCADE
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS deals (
        id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        idBuyer INT UNSIGNED NOT NULL,
        idProduct INT UNSIGNED NOT NULL,
        status ENUM('requested', 'approved', 'rejected', 'completed', 'cancelled') NOT NULL DEFAULT 'requested',
        createdAt DATETIME  DEFAULT now(),
        completedAt DATETIME ,
        updatedAt DATETIME ,
        FOREIGN KEY (idBuyer)
        REFERENCES users (id)
        ON DELETE CASCADE,
        FOREIGN KEY (idProduct)
        REFERENCES products (id)
        ON DELETE CASCADE
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS dealsMessages (
            id   INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
            idDeal INT UNSIGNED NOT NULL,
            idSender INT UNSIGNED NOT NULL,
            idRecipient INT UNSIGNED NOT NULL,
            message VARCHAR(500),
            location VARCHAR(500),
            proposedDate DATETIME,
            status ENUM('requested', 'approved', 'rejected', 'completed', 'cancelled'),
            createdAt DATETIME  DEFAULT now(),
            FOREIGN KEY (idDeal)
            REFERENCES deals (id)
        );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS follows (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        idUser INT UNSIGNED NOT NULL,
        IdFollowed INT UNSIGNED NOT NULL,
        FOREIGN KEY (idUser)
        REFERENCES users (id)
        ON DELETE CASCADE,
        FOREIGN KEY (IdFollowed)
        REFERENCES users (id)
        ON DELETE CASCADE
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS blacklists (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        idUser INT UNSIGNED NOT NULL,
        idBlacklisted INT UNSIGNED NOT NULL,
        FOREIGN KEY (idUser)
        REFERENCES users (id)
        ON DELETE CASCADE,
        FOREIGN KEY (idBlacklisted)
        REFERENCES users (id)
        ON DELETE CASCADE
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS reviews (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        idDeal INT UNSIGNED NOT NULL,
        idProduct INT UNSIGNED,
        idReviewer INT UNSIGNED,
        idReviewed INT UNSIGNED,
        roleReviewed ENUM('vendor','buyer'),
        score TINYINT NOT NULL,
        comments VARCHAR(255),
        createdAt DATETIME DEFAULT now(),
        FOREIGN KEY (idDeal)
        REFERENCES deals (id)
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS wishlist (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        idUsers INT UNSIGNED NOT NULL,
        idProducts INT UNSIGNED NOT NULL,
        isActive BOOLEAN ,
        FOREIGN KEY (idUsers)
        REFERENCES users (id),
        FOREIGN KEY (idProducts)
        REFERENCES products (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS complaints (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
        idUser INT UNSIGNED NOT NULL,
        idProduct INT UNSIGNED ,
        idDeals INT UNSIGNED ,
        idOtherUser INT UNSIGNED ,
        idReviews INT UNSIGNED ,
        message VARCHAR(255) ,
        status ENUM('solved', 'pending', 'open', 'rejected') NOT NULL DEFAULT 'open',
        image VARCHAR(50) ,
        FOREIGN KEY (idUser)
        REFERENCES users (id),
        FOREIGN KEY (idProduct)
        REFERENCES products (id),
        FOREIGN KEY (idDeals)
        REFERENCES deals (id),
        FOREIGN KEY (idOtherUser)
        REFERENCES users (id),
        FOREIGN KEY (idReviews)
        REFERENCES reviews (id)
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS complaintImages (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        fileName VARCHAR(45) NOT NULL,
        idComplaint INT UNSIGNED NOT NULL,
        FOREIGN KEY (idComplaint)
        REFERENCES complaints (id)
        )`);
    console.log('Database created successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
};
createNewDatabase();
