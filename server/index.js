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
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "store_rating",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
async function testDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database successfully!");
    connection.release(); // release connection back to pool
  } catch (err) {
    console.error("Error connecting to MySQL database:", err);
    process.exit(1); // exit process if db connection fails
  }
}

// Base route
app.use("/api/v1/store_app",Router);

const PORT =  5000;

// Start server only after DB connection is successful
testDBConnection().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash("1234", 10);
console.log(hashedPassword)

export { pool };
