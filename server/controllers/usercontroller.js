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

exports.adduser = (req, res) => {
  res.render("adduser");
};

exports.createNew = (req, res) => {
  pool.getConnection((err, connection) => {
    // if (err) {
    //   console.log("Error getting a connection from the connectionPool");
    //   return;
    // }

    if (err) throw err;

    const { name, rollno, age, phone } = req.body;

    connection.query(
      "INSERT INTO user(name, rollno, age, phone) VALUES(?, ?, ?, ?)",
      [name, rollno, age, phone],
      (err, result) => {
        connection.release();
        if (err) throw err;

        console.log("New user added", req.body);
        res.render("adduser", { message: "User added successfully !!!" });
      }
    );
  });
};

exports.edituser = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;
    console.log(id);
    connection.query("select * from user where id=?", [id], (err, row) => {
      connection.release();
      res.render("edituser", { row });
    });
  });
};

exports.saveChanges = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const { name, rollno, age, phone } = req.body;
    const id = req.params.id;
    connection.query(
      `UPDATE user SET name=?, rollno=?, age=?, phone=?
            WHERE id= ?`,
      [name, rollno, age, phone, id],
      (err, result) => {
        connection.release();
        if (err) throw err;
        else {
          // show the changed data
          pool.getConnection((err, connection) => {
            if (err) throw err;

            let id = req.params.id;
            connection.query(
              "select * from user where id=?",
              [id],
              (err, row) => {
                connection.release();
                if (err) throw err;
                res.render("edituser", {
                  row,
                  message: "User edit successful",
                });
              }
            );
          });
        }
      }
    );
  });
};

exports.delete = (req, res) => {
  pool.getConnection((err, con) => {
    if (err) throw err;

    const id = req.params.id;
    con.query("DELETE FROM user WHERE id=?", [id], (err, row) => {
      con.release();

      if (err) throw err;
      res.redirect("/");
    });
  });
};
