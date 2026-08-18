const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { generateReading, getHistory } = require('../controllers/readings.controller');

router.post('/generate', protect, generateReading);
router.get('/history', protect, getHistory);

module.exports = router;
