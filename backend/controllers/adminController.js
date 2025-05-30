const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Add a user (Admin creates a user manually)
exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, hashed, address, role], (err) => {
      if (err) return res.status(400).json({ message: 'Email already exists' });
      res.status(201).json({ message: 'User created' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a store
exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;
  const sql = 'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, address, owner_id], (err) => {
    if (err) return res.status(400).json({ message: 'Error adding store' });
    res.status(201).json({ message: 'Store created' });
  });
};

// Get dashboard stats
exports.getStats = (req, res) => {
  db.query(
    `SELECT 
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM stores) AS total_stores,
      (SELECT COUNT(*) FROM ratings) AS total_ratings`,
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error getting stats' });
      res.json(results[0]);
    }
  );
};

// List all users (admin + normal)
exports.getUsers = (req, res) => {
  const sql = `SELECT id, name, email, address, role FROM users`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching users' });
    res.json(results);
  });
};

// List all stores
exports.getStores = (req, res) => {
  const sql = `
    SELECT s.id, s.name, s.email, s.address, u.name AS owner_name,
      (SELECT AVG(rating_value) FROM ratings WHERE store_id = s.id) AS avg_rating
    FROM stores s
    LEFT JOIN users u ON s.owner_id = u.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching stores' });
    res.json(results);
  });
};
