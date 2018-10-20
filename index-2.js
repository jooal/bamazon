//functions needed: showproducts, action, howmany, updateinventory, deleteproduct
var mysql = require("mysql");
var inquirer = require("inquirer");

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
        console.log(response);
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
        } 
    ])
      .then(function(answer) {
          connection.query("SELECT * FROM products WHERE item_id = ?", answer.action, function(err, response){
            if (err) throw err;
            if(answer.action == 0) {
                console.log("Invalid ID. Try again.")
                showProducts();
            }
            else {
                console.log(response[0]);
                howMany();
            }
        });
    });
}

function howMany() {
    inquirer
    .prompt([
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
            .then(function(err, answer, response) {
                
                  if (err) throw err;
                  if(answer.quantity > response[0].stock_quantity){
                      console.log('Insufficient Quantity.Try again.');
                      showProducts();
                  }
                  else {
                      console.log("Order placed!");
                      console.log("You were charged $" + (response[0].price * answer.quantity));
                  }
              })
          }
