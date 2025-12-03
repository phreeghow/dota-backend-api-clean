// routes/player.routers.js

const Router = require('express');
const router = new Router();
const playerController = require('../controller/player.controller');

// 1. Импортируем Middleware-функцию
const authMiddleware = require('../middleware/authMiddleware'); // Проверьте путь!

// 2. Добавляем authMiddleware в цепочку обработчиков
// Запрос идет: [Запрос] -> [authMiddleware] -> [playerController]
router.post("/player", authMiddleware, playerController.getOrCreatePlayer);

module.exports = router;