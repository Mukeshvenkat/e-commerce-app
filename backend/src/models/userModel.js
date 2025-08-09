const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const db = require('../db/index');

const userModel = {
    createUser: async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
        const values = [email, hashedPassword];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    findUserByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    validatePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    }
};

module.exports = userModel;