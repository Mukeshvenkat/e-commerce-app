const db = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    register: async (req, res) => {
        const { email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
            const newUser = result.rows[0];

            res.status(201).json({
                id: newUser.id,
                email: newUser.email,
            });
        } catch (error) {
            res.status(400).json({ error: 'User registration failed' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(400).json({ error: 'Login failed' });
        }
    }
};

module.exports = authController;