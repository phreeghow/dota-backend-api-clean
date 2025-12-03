// db.js
const Pool = require('pg').Pool;

// Получаем полную строку подключения из переменных окружения Render
const connectionString = process.env.DATABASE_URL; 

if (!connectionString) {
    console.error("FATAL ERROR: DATABASE_URL is not set!");
    // В случае ошибки (если забыли настроить переменную на Render), 
    // лучше прервать процесс, чем пытаться работать без базы.
    process.exit(1); 
}

const pool = new Pool({
    // Используем единую строку подключения. Она содержит user, host, password, port и database.
    connectionString: connectionString, 
    
    // ВАЖНО: Облачные базы данных требуют SSL. Эта настройка необходима для Render.
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;