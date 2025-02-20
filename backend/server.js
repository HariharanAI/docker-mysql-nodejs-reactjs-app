const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Configuration
const mysqlConfig = {
  host: process.env.DB_HOST || "mysql-service.default.svc.cluster.local",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "pass123",
  database: process.env.DB_NAME || "appdb",
};

// Create a connection to the MySQL database
let con = mysql.createConnection(mysqlConfig);

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    process.exit(1); // Stop server if database connection fails
  }
  console.log("Connected to the database");
});

// Ensure database and table exist
const createDatabase = () => {
  con.query("CREATE DATABASE IF NOT EXISTS appdb", (err) => {
    if (err) console.error(err);
    else console.log("Database checked/created successfully");
  });
};

const createTable = () => {
  con.query(
    "CREATE TABLE IF NOT EXISTS apptb (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))",
    (err) => {
      if (err) console.error(err);
      else console.log("Table checked/created successfully");
    }
  );
};

// Initialize database and table
createDatabase();
createTable();

// GET all users
app.get("/user", (req, res) => {
  con.query("SELECT * FROM apptb", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error retrieving data" });
    }
    res.json(results);
  });
});

// POST - Add new user
app.post("/user", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  con.query("INSERT INTO apptb (name) VALUES (?)", [name], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    res.json({ message: "User added", id: results.insertId });
  });
});

// DELETE - Remove user by ID
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  con.query("DELETE FROM apptb WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error deleting data" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  });
});

// Start the server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
