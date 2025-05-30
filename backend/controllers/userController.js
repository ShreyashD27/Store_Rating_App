const db = require('../config/db');

// Get all stores with optional search
exports.getStores = (req, res) => {
  const { name = '', address = '' } = req.query;
  const sql = `
    SELECT s.*, 
      (SELECT AVG(rating_value) FROM ratings r WHERE r.store_id = s.id) AS avg_rating,
      (SELECT rating_value FROM ratings r WHERE r.store_id = s.id AND r.user_id = ?) AS user_rating
    FROM stores s
    WHERE s.name LIKE ? AND s.address LIKE ?
  `;
  db.query(sql, [req.user.id, `%${name}%`, `%${address}%`], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching stores' });
    res.json(results);
  });
};

// Submit or update rating
exports.submitRating = (req, res) => {
  const { store_id, rating_value } = req.body;
  const checkSql = 'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?';
  db.query(checkSql, [req.user.id, store_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length > 0) {
      const updateSql = 'UPDATE ratings SET rating_value = ? WHERE user_id = ? AND store_id = ?';
      db.query(updateSql, [rating_value, req.user.id, store_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating rating' });
        res.json({ message: 'Rating updated' });
      });
    } else {
      const insertSql = 'INSERT INTO ratings (user_id, store_id, rating_value) VALUES (?, ?, ?)';
      db.query(insertSql, [req.user.id, store_id, rating_value], (err) => {
        if (err) return res.status(500).json({ message: 'Error submitting rating' });
        res.json({ message: 'Rating submitted' });
      });
    }
  });
};
