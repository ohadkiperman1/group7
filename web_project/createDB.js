var sql = require("./db/db");
const path = require('path');
const csv = require('csvtojson');

const CreateUsersTable = (req,res)=>{
    const Q1  = `CREATE TABLE IF NOT EXISTS Users (
        user_id			int(11)			NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email 				varchar(255) 	NOT NULL PRIMARY KEY ,
        password			varchar(255) 	NOT NULL,
        first_Name			varchar(255) 	NOT NULL,
        last_Name			varchar(255) 	NOT NULL,
        age					int			    NOT NULL
        )`;
    sql.query(Q1,(err,mysqlres)=>{
        if (err) {
            console.log("error in creating table ", err);
            res.status(400).send({message: "error in creating table" + err});
            return;
        }
        console.log("table created");
        res.send("table created");
        return;
    })
};
const CreateOrdersTable = (req,res)=>{
    const Q1 = `CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  court_name VARCHAR(50),
  order_date DATE,
  order_time TIME,
  city VARCHAR(50),
  email VARCHAR(255),
  FOREIGN KEY (email) REFERENCES Users(email)
)`;
    sql.query(Q1,(err,mysqlres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
};
const CreateCourtsTable = (req,res)=>{
    const Q1  = `CREATE TABLE IF NOT EXISTS Courts (
        court_id			int(11)		NOT NULL PRIMARY KEY AUTO_INCREMENT,
       court_name		varchar(255) 	NOT NULL,
        city			varchar(255) 	NOT NULL,
        court_size		varchar(255) 	NOT NULL,
        court_kind		varchar(255) 	NOT NULL
        )`;
    sql.query(Q1,(err,mysqlres)=> {
        if (err) {
            console.log("error in creating table ", err);
            res.status(400).send({message: "error in creating table" + err});
            return;
        }
        console.log("table created");
        res.send("table created");
        return;
    });
};
const DropUsersTable = (req, res)=>{
    const Q4 = "DROP TABLE USERS";
    sql.query(Q4, (err, mysqlres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error in dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    });
};
const DropCourtsTable = (req, res)=>{
    const Q4 = "DROP TABLE Courts";
    sql.query(Q4, (err, mysqlres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error in dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    });
};
const DropOrdersTable = (req, res)=>{
    const Q4 = "DROP TABLE Orders";
    sql.query(Q4, (err, mysqlres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error in dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    });
};
const ShowUsersTable = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    sql.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};
const ShowOrdersTable = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    sql.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};
const ShowCourtsTable = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    sql.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};
const insertUsersData = (req,res)=>{
    var Q2 = `INSERT INTO users SET ?`;
    const csvFilePath = path.join(__dirname,'/db/users.csv');
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        sql.query(Q2, element, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
const insertCourtsData = (req,res)=>{
    var Q2 = `INSERT INTO courts SET ?`;
    const csvFilePath = path.join(__dirname,'/db/courts.csv');
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        sql.query(Q2, element, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
const insertOrdersData = (req,res)=>{
    var Q2 = `INSERT INTO orders SET ?`;
    const csvFilePath = path.join(__dirname,'/db/orders.csv');
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        sql.query(Q2, element, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
module.exports ={CreateUsersTable,CreateOrdersTable,CreateCourtsTable,DropUsersTable,DropCourtsTable,DropOrdersTable,ShowUsersTable,ShowCourtsTable,ShowOrdersTable,insertUsersData,insertCourtsData,insertOrdersData};