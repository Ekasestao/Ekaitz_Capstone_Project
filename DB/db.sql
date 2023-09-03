CREATE TABLE users (
  users_id int NOT NULL AUTO_INCREMENT,
  users_username varchar(30) NOT NULL UNIQUE,
  users_email varchar(40) NOT NULL UNIQUE,
  users_password varchar(50) NOT NULL,
  users_name varchar(30) NOT NULL,
  users_lastname varchar(30) NOT NULL,
  users_admin boolean NOT NULL DEFAULT 0,
  PRIMARY KEY (users_id),
  UNIQUE KEY users_id_UNIQUE (users_id)
);
CREATE TABLE products (
  products_id int NOT NULL AUTO_INCREMENT,
  products_name varchar(30) NOT NULL UNIQUE,
  products_description varchar(100) NOT NULL,
  products_price float NOT NULL,
  PRIMARY KEY (products_id),
  UNIQUE KEY products_id_UNIQUE (products_id)
);
CREATE TABLE sessions (
  sessions_id int NOT NULL AUTO_INCREMENT,
  sessions_username varchar(30) NOT NULL UNIQUE,
  sessions_email varchar(40) NOT NULL UNIQUE,
  sessions_password varchar(50) NOT NULL,
  sessions_name varchar(30) NOT NULL,
  sessions_lastname varchar(30) NOT NULL,
  sessions_admin boolean NOT NULL,
  PRIMARY KEY (sessions_id),
  UNIQUE KEY sessions_id_UNIQUE (sessions_id)
);