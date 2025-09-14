import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { Router } from "./routes/auth.route.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "store_rating",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


async function initializeTables() {
  try {
    // Users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(400),
        type  VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Stores table (must come before ratings)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(400) NOT NULL,
        owner_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    // Ratings table (must come last because it references stores + users)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        store_id INT NOT NULL,
        user_id INT NOT NULL,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_store FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_rating (store_id, user_id)
      )
    `);

    console.log("✅ Tables ensured successfully!");
  } catch (err) {
    console.error("❌ Error ensuring tables:", err);
  }
}




// Test database connection
async function testDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database successfully!");
    connection.release(); // release connection back to pool
    // Call this after DB connect
    initializeTables();
  } catch (err) {
    console.error("Error connecting to MySQL database:", err);
    process.exit(1); // exit process if db connection fails
  }
}

// Base route
app.use("/api/v1/store_app", Router);

const PORT = 5000;

// Start server only after DB connection is successful
testDBConnection().then(() => {
  app.listen(PORT, () => console.log("Server running on port"));
});
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash("1234", 10);
console.log(hashedPassword)

export { pool };