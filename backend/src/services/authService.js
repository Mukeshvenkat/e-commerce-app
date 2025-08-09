const db = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authService = {
    register: async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
        return result.rows[0];
    },

    login: async (email, password) => {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }
};

module.exports = authService;