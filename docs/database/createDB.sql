DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS blacklists;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS deals;
DROP TABLE IF EXISTS productImages;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    name VARCHAR(45) NULL,
    lastName VARCHAR(45) NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(45) NOT NULL,
    avatar VARCHAR(45) DEFAULT 'default-avatar.png',
    createdAt DATETIME NULL DEFAULT NOW(),
    verificationCode VARCHAR(64) NOT NULL,
    role ENUM('root', 'admin', 'user') DEFAULT 'user',
    verifiedAt DATETIME NULL,
    bio VARCHAR(255) NULL,
    region VARCHAR(45) NULL,
    country VARCHAR(45) NULL,
    type ENUM('store', 'regular') NULL,
    taxNumber VARCHAR(45) NULL,
    Address VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS products (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(45) NOT NULL,
    keywords VARCHAR(200) NULL,
    idUser INT UNSIGNED NOT NULL,
    createdAt DATETIME DEFAULT now(),
    updatedAt DATETIME NULL,
    isActive TINYINT NULL DEFAULT 1,
    locationName VARCHAR(200)  NULL,
    locationLat VARCHAR(45)  NULL,
    locationLong VARCHAR(45)  NULL,
    status ENUM('new', 'used', 'refurbished') NOT NULL,
    FOREIGN KEY (idUser)
    REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS productImages (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fileName VARCHAR(45) NOT NULL,
    idProducts INT UNSIGNED NOT NULL,
    isDefault TINYINT NULL,
    FOREIGN KEY (idProducts)
    REFERENCES products (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS deals (
    id   INT UNSIGNED NOT NULL PRIMARY KEY,
    idBuyer INT UNSIGNED NOT NULL,
    idProduct INT UNSIGNED NOT NULL,
    status ENUM('requested', 'approved', 'rejected', 'completed', 'cancelled') NOT NULL DEFAULT 'requested',
    createdAt DATETIME NULL DEFAULT now(),
    completedAt DATETIME NULL,
    updatedAt DATETIME NULL,
    FOREIGN KEY (idBuyer)
    REFERENCES users (id)
    ON DELETE CASCADE,
    FOREIGN KEY (idProduct)
    REFERENCES products (id)
    ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS follows (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUser INT UNSIGNED NOT NULL,
    IdFollowed INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUser)
    REFERENCES users (id)
    ON DELETE CASCADE,
    FOREIGN KEY (IdFollowed)
    REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS blacklists (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    idUsers INT UNSIGNED NOT NULL,
    idBlacklisted INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUsers)
    REFERENCES users (id)
    ON DELETE CASCADE,
    FOREIGN KEY (idBlacklisted)
    REFERENCES users (id)
    ON DELETE CASCADE
); 
CREATE TABLE IF NOT EXISTS reviews (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    idDeals INT UNSIGNED NOT NULL,
    score TINYINT NOT NULL,
    comments VARCHAR(255) NULL,
    createdAt DATETIME NULL DEFAULT now(),
    FOREIGN KEY (idDeals)
    REFERENCES deals (id)
);
CREATE TABLE IF NOT EXISTS wishlist (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    idUsers INT UNSIGNED NOT NULL,
    idProducts INT UNSIGNED NOT NULL,
    isActive TINYINT NULL,
    FOREIGN KEY (idUsers)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (idProducts)
    REFERENCES products (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS complaints (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    idUser INT UNSIGNED NOT NULL,
    idProduct INT UNSIGNED NULL,
    idDeals INT UNSIGNED NULL,
    idOtherUser INT UNSIGNED NULL,
    idReviews INT UNSIGNED NULL,
    message VARCHAR(255) NULL,
    status ENUM('solved', 'pending', 'open', 'rejected') NOT NULL DEFAULT 'open',
    ticketNumber VARCHAR(50) NULL,
    image VARCHAR(50) NULL,
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
    
);