const mysql = require("mysql2")
const config = require("./db.config")

const connection = mysql.createConnection({
    host : config.HOST,
    user :  config.USER,
    password : config.PASSWORD,
    database : config.DATABASE
});

connection.connect(error=>{
    if(error) throw error;
    console.log("connected to DB");
});

module.exports = connection;