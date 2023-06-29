require('dotenv').config();
const getPool = require('./database');

const gmailUsername = 'eduzavarce'; // poner aquí tu nombre de usuario de gmail
const insertRandomUsers = async () => {
  const pool = await getPool();
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (1,'admin',NULL,NULL,'${gmailUsername}@gmail.com','$2b$10$wRwraAcId5XWYEyivurOTO.SjCphLjiLsGixV5Nyitv2clXqpGu6C','2023-05-09 18:27:39','5FhLFTDfm0Nxfi1tjpHtzUEaI4KrbWEZp8yZSzh4TLRFe9AzZ0L2DYyHcR7F01iS','admin','2023-05-09 18:27:54',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (2,'root',NULL,NULL,'${gmailUsername}+1@gmail.com','$2b$10$gKhznUWNG9HfLUBhmCRRCOkE0karoWbo8MRLL3CdT6hZU3YdC731.','2023-05-09 18:28:16','uA7U6Zzigjwm5BbeoxniVrdqZ3ALf8LEQRvlZj3THAvdV4ig5RvhBGW8Xd7zILOL','root','2023-05-09 18:28:17',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (3,'vendedor',NULL,NULL,'eduzavarce+2@gmail.com','$2b$10$adn8YnMXyuZWZjWmFT761u1k9UiLPOj2./MOi47vR2zcqlpiIJGf.','2023-05-09 18:28:35','lqhJvlVD2KWC0CGrPBTmNdGtca5aENB5rEYLf1GZ951U3zMfvbaJsi9wFE3VjdoX','user','2023-05-09 18:28:39',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (4,'juanito',NULL,NULL,'${gmailUsername}+3@gmail.com','$2b$10$ufdE0GP052b3U5iasCzkn.Ksl9xOKtqcS7Hf/XotjETBSeUtrcGH2','2023-05-09 18:28:55','1kdwCClKSDn8bxwviMn58CG8k9UzZqDPv1kRqokOS8wFVuWmckiPq9aGysqZ0mDj','user','2023-05-09 18:28:57',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (5,'pepito',NULL,NULL,'${gmailUsername}+4@gmail.com','$2b$10$6ioX2VmWI2CUShUfRAn.Ce.Iz3QwQFlst0QvutI4S51hk6dgBNrKe','2023-05-09 18:29:14','ujjdgGDkSjnyQOZiroH4zn7LuA7zxAvMlS2EQ0if9eJGPJOZ1IAs8CLjzWRg7A8x','user','2023-05-09 18:29:16',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (6,'rosita',NULL,NULL,'${gmailUsername}+5@gmail.com','$2b$10$AVNuc/sFQOthCdpn5exPKujdgYTsg4qof1rD05jKLkTJGRrOyc7aC','2023-05-09 18:29:33','sB0wnTdUkLUDILBZDYEYNlwfzyxeen45T9aSlACUpAjMwANzhWDWdlv10d2Xeb4U','user','2023-05-09 18:29:35',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (7,'Sunflower8',NULL,NULL,'${gmailUsername}+6@gmail.com','$2b$10$Gllluzvy838IAH.Dv6iIh.17dUqZdjPrMu3MaXC7/CHyQDr7Nogru','2023-05-09 18:31:33','wBZEqFhw7H7A47A5QP7pGwIYNk3YwWMKKnkEUqcejuXol0pcflKYcnaideJ2CaMR','user','2023-05-09 18:31:34',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (8,'comprador',NULL,NULL,'${gmailUsername}+7@gmail.com','$2b$10$D3tSiFuRomKp5eiYrgXXM.YTrKsEnYQihYjA69kLmj/kMxL3h86j.','2023-05-09 18:31:58','EkdGmTH3z1eLQq0tekurXRLjWdMlwqINTxvmy22MGeZ9L8Avxxzs2V7JDF54w0Du','user','2023-05-09 18:32:01',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (9,'PixelCraze',NULL,NULL,'${gmailUsername}+8@gmail.com','$2b$10$4boRUhtIp1.nCH5CV5tJr.VOTDYVwgvRKkTJRCG1FVIjaB0Z5DZT2','2023-05-09 18:32:29','vsp3Y37QZPawycR9TdSBH5AyQvtRH227XDrCaHkIvmqkJuctlIDwnBl8lNbvoI4H','user','2023-05-09 18:32:30',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (10,'CosmicJoy',NULL,NULL,'${gmailUsername}+9@gmail.com','$2b$10$APYw8JzdQ9A9I9qchqXSOe0SsrGxtXFjAfD6gqny8C2viCcEPGQc.','2023-05-09 18:32:52','7fSHGaHWrdDuNAvqaEWqib50QU3TbPcg02oSo7P5Kez0mjiuba47foMXg9mtoLoU','user',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (11,'UrbanHaze',NULL,NULL,'${gmailUsername}+10@gmail.com','$2b$10$3t8UtUGjM3r4xkc3Of0vIu5D8rzbOB49.ofAlMheaZcphUxdX1gM.','2023-05-09 18:33:08','XMp0l5Z2yBktFKJZJOtFKmg2teJ1pegRFSZbwzHLeHpIJ8tbDEq2LpjfXL3G4qXN','user','2023-05-09 18:33:10',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
  // await pool.query(
  //   `INSERT INTO users (id, username , name,lastName,email,password,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address, city) VALUES (12,'DreamJunkie',NULL,NULL,'${gmailUsername}+11@gmail.com','$2b$10$fE78L3GzHudNNJZnpfFZ9uc7vuoeuNWWLotvuU5Y4hQ9LI0LJOAb.','2023-05-09 18:33:39','DO6NWYacEREUnLKyFO8MYi0DmDk7eKeYZBFcWtRH4mKOiq45A4J7Zpvz9KiqpXZz','user','2023-05-09 18:33:41',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  // );
};
// const insertRandomProducts = async () => {
//   const pool = await getPool();
//   await pool.query(
//     `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, address, status, city) VALUES ('ATARI', 'ATARI 2600', '50', 'games', 'CONSOLA PACMAN GALAXY', '3', false , 'Madrid, España', 'new', 'zaragoza');`
//   );
//   await pool.query(
//     `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, address, status, city) VALUES ('ATARI', 'ATARI 2600', '50', 'games', 'CONSOLA PACMAN GALAXY', '3', false , 'Madrid, España', 'new', 'madrid');`
//   );
//   await pool.query(
//     `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, address, status, city) VALUES ('ATARI', 'ATARI 2600', '50', 'games', 'CONSOLA PACMAN GALAXY', '3', false , 'Madrid, España', 'new', 'zaragoza');`
//   );
//   await pool.query(
//     `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, address, status, city) VALUES ('NINTENDO', 'NES', '70', 'CONSOLES', 'mario zelda nes contra', '3', true , 'Barcelona, España', 'used', 'madrid');`
//   );
//   await pool.query(
//     `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, address, status, city) VALUES ('super mario bros', 'juego de mario original', '30', 'games', 'mario nintendo', '3', true , 'zaragoza', 'new', 'zaragoza');`
//   );
//   await pool.query(
//     `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, address, status, city) VALUES ('NINTENDO', 'NES', '70', 'CONSOLES', 'mario zelda nes contra', '3', true , 'Barcelona, España', 'used', 'madrid');`
//   );
//   await pool.query(
//     `INSERT INTO products (name, description, price, category, keywords, idUser, isActive, address, status, city) VALUES ('sega', 'sega genesis', '60', 'consoles', 'sonic sega', '3', false , 'Valencia', 'refurbished', 'barcelona');`
//   );
// };
// const insertRandomDeals = async () => {
//   const pool = await getPool();
//   await pool.query(
//     `INSERT INTO deals (idBuyer, idProduct, status) VALUES (8, 1, 'completed');`
//   );
//   await pool.query(
//     `INSERT INTO deals (idBuyer, idProduct, status) VALUES (8, 2, 'completed');`
//   );
//   await pool.query(
//     `INSERT INTO deals (idBuyer, idProduct, status) VALUES (8, 3, 'completed');`
//   );
//   await pool.query(
//     `INSERT INTO deals (idBuyer, idProduct, status) VALUES (8, 7, 'requested');`
//   );
// };
// const insertRandomReviews = async () => {
//   const pool = await getPool();
//   await pool.query(
//     `INSERT INTO reviews (idDeal, idReviewer, idReviewed, roleReviewed, score, comments) VALUES (1, 3, 8,'buyer', 4, 'ha llegado un poco tarde');`
//   );
//   await pool.query(
//     `INSERT INTO reviews (idDeal, idReviewer, idReviewed, roleReviewed, score, comments) VALUES (1, 8, 3,'vendor', 5, 'el producto genial!!!');`
//   );
//   await pool.query(
//     `INSERT INTO reviews (idDeal, idReviewer, idReviewed, roleReviewed, score, comments) VALUES (2, 3, 8,'buyer', 1, 'vaya tío, siempre llega tarde!!!');`
//   );
//   await pool.query(
//     `INSERT INTO reviews (idDeal, idReviewer, idReviewed, roleReviewed, score, comments) VALUES (2, 8, 3,'vendor', 3, 'segunda vez que le compro, poco amable!');`
//   );
// };

const runFunctions = async () => {
  try {
    await insertRandomUsers();
    // await insertRandomProducts();
    // await insertRandomDeals();
    // await insertRandomReviews();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
};

runFunctions();
