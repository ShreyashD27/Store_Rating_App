const express = require('express');
const router = express.Router();


const { register, login } = require('../controllers/authController');
const { changePassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
router.post('/change-password', authenticate, changePassword);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
