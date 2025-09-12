import jwt from "jsonwebtoken";
import { pool } from "../index.js"; // your DB pool
const JWT_SECRET = "this is my secret key";

// 1️⃣ Function to create a JWT token
export const createToken = (userId, email) => {
    return jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: "7d" }); // 7 days expiry
};

// 2️⃣ Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const [results] = await pool.execute(
      "SELECT id, name, email, type FROM users WHERE id = ?",
      [decoded.id]
    );

    console.log("DB Results:", results);

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = results[0]; // attach user
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
