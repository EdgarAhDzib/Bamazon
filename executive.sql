USE bamazon;

CREATE TABLE Departments (
DepartmentID INT(10) PRIMARY KEY auto_increment NOT NULL,
DepartmentName VARCHAR(50),
OverHeadCosts DECIMAL(10,2),
TotalSales DECIMAL(10,2) DEFAULT 0.00
);

INSERT INTO Departments (`DepartmentName`,`OverHeadCosts`) VALUES ('Minerals',80.00);
INSERT INTO Departments (`DepartmentName`,`OverHeadCosts`) VALUES ('Talismans',150.00);
INSERT INTO Departments (`DepartmentName`,`OverHeadCosts`) VALUES ('Amulets',100.00);
INSERT INTO Departments (`DepartmentName`,`OverHeadCosts`) VALUES ('Spellbooks',50.00);