const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { checkCompatibility, getHistory } = require('../controllers/compatibilityController');

router.post('/check', verifyToken, checkCompatibility);
router.get('/history', verifyToken, getHistory);

module.exports = router;