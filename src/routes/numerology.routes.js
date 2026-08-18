const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { calculateProfile, getProfile } = require('../controllers/numerology.controller');

router.post('/calculate', protect, calculateProfile);
router.get('/profile', protect, getProfile);

module.exports = router;
