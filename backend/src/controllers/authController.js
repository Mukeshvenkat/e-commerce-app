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
    },


    getProfile: async (req, res) => {
        try {
            const userId = req.user.id;
            const result = await db.query('SELECT id, email FROM users WHERE id = $1', [userId]);
            const user = result.rows[0];
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: 'Failed to fetch profile' });
        }
    },

    updateProfile: async (req, res) => {
        const userId = req.user.id;
        const { email, password } = req.body;
        try {
            let query, params;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                query = 'UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING id, email';
                params = [email, hashedPassword, userId];
            } else {
                query = 'UPDATE users SET email = $1 WHERE id = $2 RETURNING id, email';
                params = [email, userId];
            }
            const result = await db.query(query, params);
            const updatedUser = result.rows[0];
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update profile' });
        }
    },

    deleteProfile: async (req, res) => {
        const userId = req.user.id;
        try {
            await db.query('DELETE FROM users WHERE id = $1', [userId]);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Failed to delete profile' });
        }
    },

};

module.exports = authController;