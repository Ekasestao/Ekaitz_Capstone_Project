CREATE TABLE users (
  users_id int NOT NULL AUTO_INCREMENT,
  users_username varchar(30) NOT NULL UNIQUE,
  users_email varchar(60) NOT NULL UNIQUE,
  users_password varchar(88) NOT NULL,
  users_name varchar(30) NOT NULL,
  users_lastname varchar(30) NOT NULL,
  users_admin boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (users_id),
  UNIQUE KEY users_id_UNIQUE (users_id)
);
CREATE TABLE products (
  products_id int NOT NULL AUTO_INCREMENT,
  products_name varchar(30) NOT NULL UNIQUE,
  products_description varchar(300) NOT NULL,
  products_price float NOT NULL,
  products_img_url varchar(1000) NOT NULL,
  PRIMARY KEY (products_id),
  UNIQUE KEY products_id_UNIQUE (products_id)
);