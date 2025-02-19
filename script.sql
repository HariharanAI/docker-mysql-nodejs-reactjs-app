-- Create the appdb database if it doesn't exist
CREATE DATABASE IF NOT EXISTS appdb;

-- Use the appdb database
USE appdb;

-- Create the apptb table if it doesn't exist
CREATE TABLE IF NOT EXISTS apptb (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

