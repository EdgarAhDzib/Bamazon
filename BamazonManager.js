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
	//console.log("connected as id " + connection.threadId);
});

inquirer.prompt([
{
	"type":"list",
	"choices":["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","Quit"],
	"message":"What would you like to do?",
	"name":"command"
}]).then(function(result){
	switch (result.command) {
		case "View Products for Sale":
			connection.query("SELECT * FROM Products", function(err, result){
				if (err) throw err;
				var catalogLen = result.length;
				for (i=0; i<catalogLen; i++){
					console.log("ID: " + result[i].ItemID + " | " + result[i].ProductName + " | $" + result[i].Price + " | Remaining stock: " + result[i].StockQuantity);
				}
			});
			connection.end();
		break;
		case "View Low Inventory":
			connection.query("SELECT * FROM Products WHERE StockQuantity < ?",[5], function(err, result){
				if (err) throw err;
				var catalogLen = result.length;
				for (i=0; i<catalogLen; i++){
					console.log("ID: " + result[i].ItemID + " | " + result[i].ProductName + " | $" + result[i].Price + " | Remaining stock: " + result[i].StockQuantity);
				}
			});
			connection.end();
		break;
		case "Add to Inventory":
		//prepare an inquirer prompt: which ID, and how much?
			inquirer.prompt([
				{
					"name":"id",
					"type":"input",
					"message":"What is the ID number?"
				},
				{
					"name":"quantity",
					"type":"input",
					"message":"How many will you add?"
				}
				]).then(function(answer){
					var idInt = parseInt(answer.id);
					var quantInt = parseInt(answer.quantity);
					var idIsNumber = Number.isInteger(idInt);
					var quantIsNumber = Number.isInteger(quantInt);
					if (idIsNumber === true && quantIsNumber === true) {
						connection.query("UPDATE Products SET StockQuantity = StockQuantity + ? WHERE ItemID = ?",[quantInt,idInt],function(err,result){
							if (err) throw err;
							console.log("Inventory updated!");
						});
						connection.end();
					} else {
						console.log("We're sorry, something went wrong. Please try again!");
						connection.end();
					}
				});
		break;
		case "Add New Product":
			inquirer.prompt([
				{
					"name":"prodName",
					"type":"input",
					"message":"What is the product's name?"
				},
				{
					"name":"dept",
					"type":"input",
					"message":"What department will it belong to?"
				},
				{
					"name":"price",
					"type":"input",
					"message":"How much will it cost?"
				},
				{
					"name":"quantity",
					"type":"input",
					"message":"How many will you add?"
				}
				]).then(function(answer){
					var quantInt = parseInt(answer.quantity);
					var priceFloat = Number.parseFloat(answer.price).toFixed(2);
					var decimal =  /^[-+]?[0-9]+\.[0-9]+$/;
					var quantIsNumber = Number.isInteger(quantInt);

					if (answer.prodName !== "" && answer.dept !== "" && priceFloat.match(decimal) && quantIsNumber) {
						connection.query("INSERT INTO Products SET ?", [{ProductName:answer.prodName, DepartmentName:answer.dept, Price:priceFloat, StockQuantity:quantInt}] ,function(err){
							if (err) throw err;
							console.log("Thank you! The catalog is now updated with the new item!");
						});
					} else {
						console.log("We're sorry, something went wrong. Please try again!");
					}

					connection.end();
				});
		break;
		case "Quit":
			connection.end();
	}
});