const express = require('express');
const router = express.Router();
const db = require('../db/index');

// Add item to cart
router.post('/cart/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        await db.query(
            'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart.quantity + $3',
            [userId, productId, quantity]
        );
        res.json({ message: 'Item added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove item from cart
router.post('/cart/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await db.query(
            'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
            [userId, productId]
        );
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get cart items
router.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await db.query(
            'SELECT * FROM cart WHERE user_id = $1',
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Checkout
router.post('/checkout', async (req, res) => {
    const { userId, address, paymentInfo } = req.body;
    try {
        // Save order details (simplified)
        await db.query(
            'INSERT INTO orders (user_id, address, payment_info) VALUES ($1, $2, $3)',
            [userId, address, paymentInfo]
        );
        // Optionally clear cart
        await db.query('DELETE FROM cart WHERE user_id = $1', [userId]);
        res.json({ message: 'Order placed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;