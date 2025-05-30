const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/add-user', authenticate, authorize(['admin']), adminController.addUser);
router.post('/add-store', authenticate, authorize(['admin']), adminController.addStore);
router.get('/stats', authenticate, authorize(['admin']), adminController.getStats);
router.get('/users', authenticate, authorize(['admin']), adminController.getUsers);
router.get('/stores', authenticate, authorize(['admin']), adminController.getStores);

router.get('/store-owners', authenticate, authorize(['admin']), (req, res) => {
  const db = require('../config/db');
  db.query("SELECT id, name, email FROM users WHERE role = 'store_owner'", (err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch store owners" });
    res.json(results);
  });
});

module.exports = router;
