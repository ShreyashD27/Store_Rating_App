const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { authenticate, authorize } = require('../middleware/auth');
const db = require('../config/db');


router.get('/ratings', authenticate, authorize(['store_owner']), storeController.getStoreRatings);
router.get('/average-rating', authenticate, authorize(['store_owner']), storeController.getAverageRating);

router.post('/create', authenticate, authorize(['store_owner']), (req, res) => {
  const { name, email, address } = req.body;
  const owner_id = req.user.id;

  const sql = 'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, address, owner_id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Store creation failed' });
    res.status(201).json({ message: 'Store created successfully' });
  });
});
module.exports = router;
