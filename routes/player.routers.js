// routes/player.routers.js
const Router = require('express');
const router = new Router();
const playerController = require('../controller/player.controller');

// 1. Импортируем Middleware-функцию
const authMiddleware = require('../middleware/authMiddleware'); // Проверьте путь!

const authMiddleware = require('../middleware/authMiddleware');

// Добавляем authMiddleware ПЕРЕД контроллером
router.post('/player', authMiddleware, playerController.getOrCreatePlayer);
router.post('/player/update_stats', authMiddleware, playerController.updatePlayerStats);

module.exports = router;
