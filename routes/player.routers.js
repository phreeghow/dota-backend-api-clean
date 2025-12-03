// routes/player.routers.js
const Router = require('express');
const router = new Router();
const playerController = require('../controllers/player.controller');

// 1. Импортируем Middleware-функцию
const authMiddleware = require('../middleware/authMiddleware'); // Проверьте путь!

// Маршрут для создания/получения игрока (используется при входе)
router.post('/player', playerController.getOrCreatePlayer);

// НОВЫЙ МАРШРУТ для обновления статистики (используется после раунда)
router.post('/player/update', playerController.updatePlayerStats); 

module.exports = router;