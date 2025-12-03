const SECRET_KEY = process.env.SERVER_SECRET_KEY; 

if (!SECRET_KEY) {
    console.error("FATAL ERROR: SERVER_SECRET_KEY is not defined in environment variables!");
    // В продакшене лучше сразу выйти из процесса, чтобы избежать незащищенного запуска
    // process.exit(1); 
}


module.exports = function (req, res, next) {
    // Получаем токен из заголовка X-Auth-Token
    const token = req.headers['x-auth-token'];

    if (!token) {
        // Если заголовок вообще отсутствует
        return res.status(401).json({ message: "Access token required" });
    }

    if (token === SECRET_KEY) {
        // Ключ совпал — продолжаем выполнение запроса
        next(); 
    } else {
        // Ключ не совпал
        console.warn("Unauthorized API call detected.");
        return res.status(403).json({ message: "Invalid access token" });
    }
};