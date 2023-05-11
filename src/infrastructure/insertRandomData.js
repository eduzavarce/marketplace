require('dotenv').config();
const getPool = require('./database');

const insertRandomUsers = async () => {
  const pool = await getPool();
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (1,'admin',NULL,NULL,'cayetano.ponce.molina@gmail.com','$2b$10$wRwraAcId5XWYEyivurOTO.SjCphLjiLsGixV5Nyitv2clXqpGu6C','default-avatar.png','2023-05-09 18:27:39','5FhLFTDfm0Nxfi1tjpHtzUEaI4KrbWEZp8yZSzh4TLRFe9AzZ0L2DYyHcR7F01iS','admin','2023-05-09 18:27:54',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (2,'root',NULL,NULL,'cayetano.ponce.molina+1@gmail.com','$2b$10$gKhznUWNG9HfLUBhmCRRCOkE0karoWbo8MRLL3CdT6hZU3YdC731.','default-avatar.png','2023-05-09 18:28:16','uA7U6Zzigjwm5BbeoxniVrdqZ3ALf8LEQRvlZj3THAvdV4ig5RvhBGW8Xd7zILOL','root','2023-05-09 18:28:17',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (3,'PIMIENTO',NULL,NULL,'eduzavarce+2@gmail.com','$2b$10$adn8YnMXyuZWZjWmFT761u1k9UiLPOj2./MOi47vR2zcqlpiIJGf.','default-avatar.png','2023-05-09 18:28:35','lqhJvlVD2KWC0CGrPBTmNdGtca5aENB5rEYLf1GZ951U3zMfvbaJsi9wFE3VjdoX','user','2023-05-09 18:28:39',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (4,'juanito',NULL,NULL,'cayetano.ponce.molina+3@gmail.com','$2b$10$ufdE0GP052b3U5iasCzkn.Ksl9xOKtqcS7Hf/XotjETBSeUtrcGH2','default-avatar.png','2023-05-09 18:28:55','1kdwCClKSDn8bxwviMn58CG8k9UzZqDPv1kRqokOS8wFVuWmckiPq9aGysqZ0mDj','user','2023-05-09 18:28:57',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (5,'pepito',NULL,NULL,'cayetano.ponce.molina+4@gmail.com','$2b$10$6ioX2VmWI2CUShUfRAn.Ce.Iz3QwQFlst0QvutI4S51hk6dgBNrKe','default-avatar.png','2023-05-09 18:29:14','ujjdgGDkSjnyQOZiroH4zn7LuA7zxAvMlS2EQ0if9eJGPJOZ1IAs8CLjzWRg7A8x','user','2023-05-09 18:29:16',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (6,'rosita',NULL,NULL,'cayetano.ponce.molina+5@gmail.com','$2b$10$AVNuc/sFQOthCdpn5exPKujdgYTsg4qof1rD05jKLkTJGRrOyc7aC','default-avatar.png','2023-05-09 18:29:33','sB0wnTdUkLUDILBZDYEYNlwfzyxeen45T9aSlACUpAjMwANzhWDWdlv10d2Xeb4U','user','2023-05-09 18:29:35',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (7,'Sunflower8',NULL,NULL,'cayetano.ponce.molina+6@gmail.com','$2b$10$Gllluzvy838IAH.Dv6iIh.17dUqZdjPrMu3MaXC7/CHyQDr7Nogru','default-avatar.png','2023-05-09 18:31:33','wBZEqFhw7H7A47A5QP7pGwIYNk3YwWMKKnkEUqcejuXol0pcflKYcnaideJ2CaMR','user','2023-05-09 18:31:34',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (8,'AquaLilly',NULL,NULL,'cayetano.ponce.molina+7@gmail.com','$2b$10$D3tSiFuRomKp5eiYrgXXM.YTrKsEnYQihYjA69kLmj/kMxL3h86j.','default-avatar.png','2023-05-09 18:31:58','EkdGmTH3z1eLQq0tekurXRLjWdMlwqINTxvmy22MGeZ9L8Avxxzs2V7JDF54w0Du','user','2023-05-09 18:32:01',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (9,'PixelCraze',NULL,NULL,'cayetano.ponce.molina+8@gmail.com','$2b$10$4boRUhtIp1.nCH5CV5tJr.VOTDYVwgvRKkTJRCG1FVIjaB0Z5DZT2','default-avatar.png','2023-05-09 18:32:29','vsp3Y37QZPawycR9TdSBH5AyQvtRH227XDrCaHkIvmqkJuctlIDwnBl8lNbvoI4H','user','2023-05-09 18:32:30',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (10,'CosmicJoy',NULL,NULL,'cayetano.ponce.molina+9@gmail.com','$2b$10$APYw8JzdQ9A9I9qchqXSOe0SsrGxtXFjAfD6gqny8C2viCcEPGQc.','default-avatar.png','2023-05-09 18:32:52','7fSHGaHWrdDuNAvqaEWqib50QU3TbPcg02oSo7P5Kez0mjiuba47foMXg9mtoLoU','user',NULL,NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (11,'UrbanHaze',NULL,NULL,'cayetano.ponce.molina+10@gmail.com','$2b$10$3t8UtUGjM3r4xkc3Of0vIu5D8rzbOB49.ofAlMheaZcphUxdX1gM.','default-avatar.png','2023-05-09 18:33:08','XMp0l5Z2yBktFKJZJOtFKmg2teJ1pegRFSZbwzHLeHpIJ8tbDEq2LpjfXL3G4qXN','user','2023-05-09 18:33:10',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
  await pool.query(
    `INSERT INTO users (id, username , name,lastName,email,password,avatar,createdAt,verificationCode,role,verifiedAt,bio,region,country,type,taxNumber,address) VALUES (12,'DreamJunkie',NULL,NULL,'cayetano.ponce.molina+11@gmail.com','$2b$10$fE78L3GzHudNNJZnpfFZ9uc7vuoeuNWWLotvuU5Y4hQ9LI0LJOAb.','default-avatar.png','2023-05-09 18:33:39','DO6NWYacEREUnLKyFO8MYi0DmDk7eKeYZBFcWtRH4mKOiq45A4J7Zpvz9KiqpXZz','user','2023-05-09 18:33:41',NULL,NULL,NULL,NULL,NULL,NULL);`
  );
};
const insertRandomProducts = async () => {
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
};
const runFunctions = async () => {
  try {
    await insertRandomUsers();
    await insertRandomProducts();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
};

runFunctions();
