var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table');

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

var sqlArray = [];

inquirer.prompt(
	{
		"type":"list",
		"name":"options",
		"choices":["View Product Sales by Department","Create New Department"],
		"message":"What would you like to do?"
	}
	).then(function(answer){
		switch(answer.options) {
			case "View Product Sales by Department":
			connection.query("SELECT Departments.DepartmentID,Departments.DepartmentName,Departments.OverHeadCosts,Departments.TotalSales, AVG(Departments.TotalSales - Departments.OverHeadCosts) AS TotalProfit FROM Departments JOIN Products ON Departments.DepartmentName = Products.DepartmentName GROUP BY Products.DepartmentName ORDER BY DepartmentID", function(err, result){
				for (i=0; i<result.length; i++){
					sqlArray.push({"DepartmentID":result[i].DepartmentID,"DepartmentName":result[i].DepartmentName,"OverHeadCosts":result[i].OverHeadCosts,"ProductSales":result[i].TotalSales,"TotalProfit":result[i].TotalProfit});
				}
				console.table(sqlArray);
			});
			connection.end();
			break;
			case "Create New Department":
			inquirer.prompt([
			{
				"type":"input",
				"name":"dept",
				"message":"What is the new department name?"
			},
			{
				"type":"input",
				"name":"cost",
				"message":"Projected overhead costs?"
			}
			]).then(function(answer){
				var costFloat = parseFloat(answer.cost).toFixed(2);
				var decimal =  /^[-+]?[0-9]+\.[0-9]+$/;
				var costIsFloat = costFloat.match(decimal);
				connection.query("SELECT * FROM Departments WHERE DepartmentName = ?",[answer.dept],function(err,result){
					if (err) throw err;
					if (result.length > 0) {
						console.log("Sorry, this department already exists! Please try again.");
						connection.end();
					} else {
						if (costIsFloat !== null) {
						connection.query("INSERT INTO Departments SET ?", [{DepartmentName:answer.dept, OverHeadCosts:answer.cost}], function(err){
							if (err) throw err;
							console.log("The " + answer.dept + " department is added!");
							connection.end();
						});
						} else {
							console.log("Sorry, something went wrong with the projected overhead! Please try again.");
							connection.end();
						}
					}
				});
			});
			break;
		}
	});