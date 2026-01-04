const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, initDb } = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
// 1. Fetching product list
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. Placing an order
app.post('/api/orders', (req, res) => {
    const { product_name, quantity, buyer_name, delivery_address } = req.body;
    if (!product_name || !quantity || !buyer_name || !delivery_address) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `INSERT INTO orders (product_name, quantity, buyer_name, delivery_address) VALUES (?, ?, ?, ?)`;
    db.run(sql, [product_name, quantity, buyer_name, delivery_address], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            orderId: this.lastID,
            message: "Order placed successfully"
        });
    });
});

// 3. Fetching order status by Order ID
app.get('/api/orders/:id', (req, res) => {
    db.get("SELECT * FROM orders WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Order not found" });
        res.json(row);
    });
});

// 4. Viewing all orders (admin)
app.get('/api/admin/orders', (req, res) => {
    db.all("SELECT * FROM orders ORDER BY created_at DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 5. Updating order status (admin)
app.put('/api/admin/orders/:id', (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Status is required" });

    db.run("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Order status updated" });
    });
});

// Initialize DB and start server
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to initialize database:", err);
});
