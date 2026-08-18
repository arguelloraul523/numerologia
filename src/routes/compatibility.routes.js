const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { checkCompatibility } = require('../controllers/compatibility.controller');

router.post('/check', protect, checkCompatibility);

module.exports = router;
