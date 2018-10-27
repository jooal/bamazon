
DROP DATABASE IF EXISTS bamazon;
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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Toy", "Pets", 5, 10), 
("A Book", "Books", 20, 5),
("Shoe Rack", "Storage", 40, 7), 
("Headphones", "Electronics", 10, 10), 
("K-cups", "Pantry", 13, 20), 
("TV", "Electronics", 300, 4), 
("Socks", "Apparel", 10, 12), 
("Dog Bed", "Pets", 70, 4), 
("Coffe Machine", "Kitchen Appliances", 50, 3),
("Hangers", "Storage", 10, 20);

SELECT * FROM products;