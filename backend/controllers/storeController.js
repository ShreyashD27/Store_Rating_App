const db = require('../config/db');

// Get ratings submitted to the store owned by current user
exports.getStoreRatings = (req, res) => {
  const sql = `
    SELECT u.name, u.email, r.rating_value
    FROM ratings r
    JOIN users u ON r.user_id = u.id
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
  `;
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching ratings' });
    res.json(results);
  });
};

// Get average rating for store owner
exports.getAverageRating = (req, res) => {
  const sql = `
    SELECT AVG(r.rating_value) AS avg_rating
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    WHERE s.owner_id = ?
  `;
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching average rating' });
    res.json(results[0]);
  });
};
