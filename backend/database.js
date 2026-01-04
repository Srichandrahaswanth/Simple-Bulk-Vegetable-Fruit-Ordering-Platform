const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Create Products table
            db.run(`CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                image_url TEXT,
                category TEXT
            )`);

            // Create Orders table
            db.run(`CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                buyer_name TEXT NOT NULL,
                delivery_address TEXT NOT NULL,
                status TEXT DEFAULT 'Pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Seed products if empty
            db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
                if (row.count === 0) {
                    const products = [
                        ['Carrot', 40.0, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&auto=format&fit=crop', 'Vegetable'],
                        ['Tomato', 30.0, 'https://unsplash.com/photos/a-bowl-of-red-tomatoes-jVLahCBXaJs', 'Vegetable'],
                        ['Potato', 25.0, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg', 'Vegetable'],
                        ['Onion', 35.0, 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&auto=format&fit=crop', 'Vegetable'],
                        ['Apple', 120.0, 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg', 'Fruit'],
                        ['Banana', 60.0, 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg', 'Fruit'],
                        ['Orange', 80.0, 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&auto=format&fit=crop', 'Fruit'],
                        ['Grapes', 90.0, 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg', 'Fruit']
                    ];
                    const stmt = db.prepare("INSERT INTO products (name, price, image_url, category) VALUES (?, ?, ?, ?)");
                    products.forEach(p => stmt.run(p));
                    stmt.finalize();
                }
            });

            console.log('Database initialized.');
            resolve();
        });
    });
};

module.exports = { db, initDb };
