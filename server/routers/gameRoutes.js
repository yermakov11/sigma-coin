const express = require('express');
const gameController  = require('../controllers/gameController');
const authMiddleware = require('../middleware/requireAuth');

const router = express.Router();
router.get('/balance', authMiddleware, gameController.addCoins);

module.exports = router;