const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, hash, address, role || 'user'], (err) => {
      if (err) return res.status(400).json({ message: 'Email already exists' });
      res.status(201).json({ message: 'User registered' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  db.query('SELECT password FROM users WHERE id = ?', [userId], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(oldPassword, results[0].password);
    if (!match) return res.status(403).json({ message: 'Old password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId], (err) => {
      if (err) return res.status(500).json({ message: 'Error updating password' });
      res.json({ message: 'Password updated' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ token });
  });
};
