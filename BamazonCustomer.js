var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'
});

connection.connect(function(err){
if (err) throw err;
	console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM Products", function(err, result){
	if (err) throw err;
	var catalogLen = result.length;
	for (i=0; i<catalogLen; i++){
		console.log("ID: " + result[i].ItemID + " | " + result[i].ProductName + " | $" + result[i].Price);
	}
	function makeOrder(){
		inquirer.prompt([
		{
			"type":"input",
			"message":"What is the ID of the item you wish to buy?",
			"name":"id"
		},
		{
			"type":"input",
			"message":"How many do you wish to buy?",
			"name":"quantity"
		}	
		]).then(function(res){
			var itemAmt = parseInt(res.quantity);
			var isNumber = Number.isInteger(itemAmt);
			if (res.id > 0 && res.id <= catalogLen && isNumber === true) {
				connection.query("SELECT * FROM Products WHERE `ItemID` = ?",[res.id], function(err,catalog){
					var currDept = catalog[0].DepartmentName;
					var totalPurch = catalog[0].Price * itemAmt;
					if (err) throw err;
					if (itemAmt <= catalog[0].StockQuantity) {
						connection.query("UPDATE Products SET StockQuantity = StockQuantity - ? WHERE ItemID = ?",[itemAmt,res.id],function(err){
							if (err) throw err;
						});
						connection.query("UPDATE Departments SET TotalSales = TotalSales + ? WHERE DepartmentName = ?",[totalPurch,currDept],function(err){
							if (err) throw err;
						});
						console.log("Thank you for your order!");
						console.log("Your total purchase will cost $" + (totalPurch) + ".\n(Shipping rates not included.)");
						connection.end();
					} else {
						console.log("Sorry, we don't have enough " + catalog[0].ProductName + " for your order! Please try again.");
						connection.end();
					}
				});

			} else {
					console.log("We're sorry, something went wrong with your order! Please try again.\n");
					makeOrder();
				}
		});
	}
	makeOrder();
});