CREATE TABLE users (
  users_id int NOT NULL AUTO_INCREMENT,
  users_username varchar(30) NOT NULL,
  users_email varchar(40) NOT NULL,
  users_password varchar(50) NOT NULL,
  users_name varchar(30) NOT NULL,
  users_lastname varchar(30) NOT NULL,
  PRIMARY KEY (users_id),
  UNIQUE KEY users_id_UNIQUE (users_id)
);

CREATE TABLE products (
  products_id int NOT NULL AUTO_INCREMENT,
  products_name varchar(30) NOT NULL,
  products_description varchar(100) NOT NULL,
  products_price float NOT NULL,
  PRIMARY KEY (products_id),
  UNIQUE KEY products_id_UNIQUE (products_id)
);