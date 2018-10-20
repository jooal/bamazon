CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT, 
product_name VARCHAR(100) NOT NULL, 
department_name VARCHAR(100) NOT NULL, 
price INT(10) NOT NULL, 
stock_quantity INT(10) NOT NULL, 
PRIMARY KEY(item_id)
);

SELECT * FROM products;