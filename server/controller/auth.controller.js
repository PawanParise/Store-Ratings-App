import { pool } from "../index.js";
import bcrypt from 'bcrypt'
import { createToken } from "../middleware/auth.middleware.js";

export const Signup = async (req, res) => {
    const { name, email, address, password, type } = req.body;

    if (!name || !email || !address || !password || !type) {
        return res.status(400).json({ message: "All fields including type are required." });
    }

    try {
        // ✅ Ensure table exists before proceeding
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(60) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                address VARCHAR(400),
                role ENUM('admin','user','store_owner') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // ✅ Check if user already exists
        const [existing] = await pool.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );
        if (existing.length > 0) {
            return res.status(409).json({ message: "Email already registered." });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insert user
        await pool.execute(
            "INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)",
            [name, email, address, hashedPassword, type]
        );

        res.status(201).json({ message: "Signup successful." });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error." });
    }
};


export const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

    try {
        const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) return res.status(404).json({ message: "User not found." });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

        const token = createToken(user.id);

        res.status(200).json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email, type: user.type } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }

}


export const GetUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT id, name, email, address, type FROM users "
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No store owners found." });
        }

        res.status(200).json({ allUsers: rows });
    } catch (error) {
        console.error("Error fetching store owners:", error);
        res.status(500).json({ message: "Server error while fetching store owners." });
    }
};

export const GetStores = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM stores "
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No store found." });
        }

        res.status(200).json({ allStores: rows });
    } catch (error) {
        console.error("Error fetching store :", error);
        res.status(500).json({ message: "Server error while fetching store ." });
    }
};



export const AddStore = async (req, res) => {
    const { name, address, owner_id } = req.body;

    if (!name || !address || !owner_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Step 1: Ensure table exists
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS stores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                address VARCHAR(400) NOT NULL,
                owner_id INT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `;
        await pool.execute(createTableQuery);

        // Step 2: Insert new store
        const insertQuery = "INSERT INTO stores (name, address, owner_id) VALUES (?, ?, ?)";
        const [result] = await pool.execute(insertQuery, [name, address, owner_id]);

        const newStore = {
            id: result.insertId,
            name,
            address,
            owner_id,
        };

        res.status(201).json(newStore);
    } catch (err) {
        console.error("Error adding store:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const UpdateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password, address, type } = req.body;

    if (!name || !email || !password || !address || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if email already exists for a different user
        const [existingEmail] = await pool.query(
            `SELECT id FROM users WHERE email = ? AND id != ?`,
            [email, userId]
        );

        if (existingEmail.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already in use by another user.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update query
        const [result] = await pool.query(
            `UPDATE users 
             SET name = ?, email = ?, password = ?, address = ?, type = ? 
             WHERE id = ?`,
            [name, email, hashedPassword, address, type, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Fetch updated user
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [userId]);

        res.json({ success: true, user: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const DeleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Delete user query
        const [result] = await pool.query(
            `DELETE FROM users WHERE id = ?`,
            [userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const DeleteStore = async (req, res) => {
    const storeId = req.params.storeId;

    try {
        // Delete user query
        const [result] = await pool.query(
            `DELETE FROM stores WHERE id = ?`,
            [storeId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }

        res.json({ success: true, message: 'Store deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const changePassword = async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // 1. Get user from DB
        const [rows] = await pool.execute("SELECT password FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const hashedPassword = rows[0].password;

        // 2. Compare old password
        const isMatch = await bcrypt.compare(oldPassword, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Old password is incorrect" });
        }

        // 3. Hash new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // 4. Update password in DB
        await pool.execute("UPDATE users SET password = ? WHERE id = ?", [newHashedPassword, userId]);

        res.status(200).json({ success: true, message: "Password updated successfully" });

    } catch (err) {
        console.error("Change password error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const AddRating = async (req, res) => {
    const storeId  = req.params.id;
    const { rating } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Invalid rating" });
    }

    try {
        // Step 1: Ensure table exists
        const createTableQuery = `
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
        `;
        await pool.query(createTableQuery);

        // Step 2: Check if user already rated
        const [existing] = await pool.query(
            "SELECT * FROM ratings WHERE store_id=? AND user_id=?",
            [storeId, userId]
        );

        if (existing.length > 0) {
            await pool.query(
                "UPDATE ratings SET rating=? WHERE store_id=? AND user_id=?",
                [rating, storeId, userId]
            );
        } else {
            await pool.query(
                "INSERT INTO ratings (store_id, user_id, rating) VALUES (?, ?, ?)",
                [storeId, userId, rating]
            );
        }

        // ✅ Step 3: Fetch latest rating for this user-store
        const [updatedRating] = await pool.query(
            "SELECT store_id, user_id, rating , updated_at FROM ratings WHERE store_id=? AND user_id=?",
            [storeId, userId]
        );

        res.json({
            success: true,
            message: "Rating saved successfully",
            rating: updatedRating[0], // return user’s rating object
        });
    } catch (err) {
        console.error("Error in AddRating:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const GetRating = async (req, res) => {
     
    try {
        const [rows] = await pool.query(
            "SELECT * from ratings"
        );

         if(rows.length==0){
              return res.status(400).json({
                message:'No rating found'
              })
         }

        res.json({ ratings: rows});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const GetUserRating = async (req, res) => {
     const userId = req.user.id
    try {
        const [rows] = await pool.query(
            "SELECT * from ratings WHERE user_id=?",[userId]
        );

         if(rows.length==0){
              return res.status(400).json({
                message:'No rating found'
              })
         }

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}