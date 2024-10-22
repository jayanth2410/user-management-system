const mysql = require("mysql2");
require("dotenv").config();

//Connecting with the database
//pool configurations
const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(poolConfig); // creating a pool with 10 connections

exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error getting a connection from the connectionPool");
      return;
    }

    //do queries here and release the connection back to the pool
    connection.query("SELECT * FROM user", (err, row, field) => {
      connection.release();
      if (err) {
        throw err;
      } else {
        console.log("data fetching successful");
        res.render("home", { row });
      }
    });
  });
};
