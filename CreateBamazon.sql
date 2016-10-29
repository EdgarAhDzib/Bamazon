CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
ItemID INT(10) NOT NULL auto_increment PRIMARY KEY,
ProductName VARCHAR(50),
DepartmentName VARCHAR(50),
Price DECIMAL(10,2),
StockQuantity INT(10)
);

INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Opal','Minerals', 700, 10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Quartz','Minerals', 2000, 5);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Amethyst','Minerals', 4300, 4);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Nkisi Nkondi','Talismans', 2000, 10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Spirit Mask','Talismans', 70, 30);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Faience Ankh','Talismans', 500, 15);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Obsidian Dagger','Amulets', 20, 40);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Ivory Cross','Amulets', 90, 10);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('The Coptic Hoard','Spellbooks', 800, 5);
INSERT INTO Products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('Paracelsus\' Archidoxes of Magic','Spellbooks', 50, 20);