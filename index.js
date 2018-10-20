//functions needed: showproducts, action, howmany, updateinventory, deleteproduct
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProducts();

  });

function showProducts() {
    console.log("Retrieving products...\n");
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err; 
        console.table(response);
        askForAction();
    });
}


function askForAction() {
    inquirer
      .prompt([
          {
            name: "action",
            type: "input",
            message: "Provide the item id of the product you'd like to buy.", 
            validate: function(value) {
               if(isNaN(value)===false){
                    return true;
                }
                return false;
            }
        }, 
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value) {
                if(isNaN(value)===false){
                    return true;
                }
                return false;
            }
        }
    ])
      .then(function(answer) {
          connection.query("SELECT * FROM products WHERE item_id = ?", answer.action, function(err, response){
            if (err) throw err;
            if (answer.action > 10 || answer.action <= 0) {
                console.log("Invalid item ID. Try again.");
                showProducts();
            }
            else if(answer.quantity > response[0].stock_quantity){
                console.log('Insufficient Quantity. Try again.');
                showProducts();
            }
            else {
                console.log("Order placed!");
                console.log("You were charged $" + (response[0].price * answer.quantity) + " for " + (answer.quantity) + " " + (response[0].product_name) + ".");
                console.log("Updating inventory.");
                connection.query("UPDATE products SET ? WHERE ?", 
                [{
                    stock_quantity: (response[0].stock_quantity - answer.quantity)
                },
                {
                    item_id: answer.action
                }], 
                function(err, response) {
                    if (err) throw err;
                    console.log(response.affectedRows + " inventory updated!");
                    newOrder();
                }
                );

            }
        })
    });
}

function newOrder() {
    inquirer
    .prompt([
        {
            type:"confirm", 
            name: "newOrder", 
            message:"Do you want to place another order?"
        }
    ])
    .then(function(answer) {
        if (answer.newOrder) {
            showProducts();
        }
        else {
            console.log("Thank you!");
            connection.end();
        }
    })
    
}


