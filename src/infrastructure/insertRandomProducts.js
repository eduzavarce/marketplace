require('dotenv').config();
const getPool = require('./database');
const insertRandomProducts = async () => {
  try {
    const pool = await getPool();
    await pool.query(
      `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, locationName, status) VALUES ('ATARI', 'ATARI 2600', '50', 'games', 'CONSOLA PACMAN GALAXY', '1', true , 'Madrid, España', 'new');`
    );
    await pool.query(
      `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, locationName, status) VALUES ('ATARI', 'ATARI 2600', '50', 'games', 'CONSOLA PACMAN GALAXY', '1', true , 'Madrid, España', 'new');`
    );
    await pool.query(
      `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, locationName, status) VALUES ('ATARI', 'ATARI 2600', '50', 'games', 'CONSOLA PACMAN GALAXY', '1', true , 'Madrid, España', 'new');`
    );
    await pool.query(
      `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, locationName, status) VALUES ('NINTENDO', 'NES', '70', 'CONSOLES', 'mario zelda nes contra', '4', true , 'Barcelona, España', 'used');`
    );
    await pool.query(
      `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, locationName, status) VALUES ('super mario bros', 'juego de mario original', '30', 'games', 'mario nintendo', '3', true , 'zaragoza', 'new');`
    );
    await pool.query(
      `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, locationName, status) VALUES ('NINTENDO', 'NES', '70', 'CONSOLES', 'mario zelda nes contra', '4', true , 'Barcelona, España', 'used');`
    );
    await pool.query(
      `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, locationName, status) VALUES ('sega', 'sega genesis', '60', 'consoles', 'sonic sega', '10', false , 'Valencia', 'refurbished');`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
insertRandomProducts();
