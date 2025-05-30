const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/stores', authenticate, authorize(['user']), userController.getStores);
router.post('/rate', authenticate, authorize(['user']), userController.submitRating);

module.exports = router;
