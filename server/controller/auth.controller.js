import { pool } from "../index.js";
import bcrypt from 'bcrypt'
import { createToken } from "../middleware/auth.middleware.js";

export const Signup = async (req, res) => {
    const { name, email, address, password, type } = req.body;

    if (!name || !email || !address || !password || !type) {
        return res.status(400).json({ message: 'All fields including type are required.' });
    }

    try {
        const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.execute(
            'INSERT INTO users (name, email, address, password, type) VALUES (?, ?, ?, ?, ?)',
            [name, email, address, hashedPassword, type]
        );

        res.status(201).json({ message: 'Signup successful.' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error.' });
    }
}

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
