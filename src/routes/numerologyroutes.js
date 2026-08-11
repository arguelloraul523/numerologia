const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { calculate, getProfile } = require('../controllers/numerologyController');

router.post('/calculate', verifyToken, calculate);
router.get('/profile', verifyToken, getProfile);

module.exports = router;