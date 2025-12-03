const db = require("../db");

class PlayerController {
    // 1.1. Ваш существующий метод: getOrCreatePlayer (для инициализации)
    async getOrCreatePlayer(req, res) {
        const { steam_id } = req.body;
        
        const player = await db.query("SELECT * FROM player WHERE steam_id = $1", [steam_id]);
        if (player.rows[0]) {
            console.log("PLAYER ALREADY EXISTS");
            return res.json(player.rows[0]);
        }

        console.log("No matching player, creating new...");
        const newPlayer = await db.query(
            "INSERT INTO player (steam_id, currency, boss_kills, wins) VALUES ($1, $2, $3, $4) RETURNING *", 
            [steam_id, 0, 0, 0]
        );
        res.json(newPlayer.rows[0]);
    }

    async updatePlayerStats(req, res) {
        // Мы ожидаем *дельту* (разницу) в статистике, заработанную в раунде.
        const { steam_id, currency, boss_kills, wins } = req.body; 

        if (!steam_id) {
            return res.status(400).json({ message: "Missing steam_id." });
        }

        try {
            // Используем оператор "+" в SQL для увеличения существующих значений
            const updatedPlayer = await db.query(
                `UPDATE player 
                 SET 
                    currency = currency + $2,     
                    boss_kills = boss_kills + $3, 
                    wins = wins + $4              
                    WHERE steam_id = $1
                    RETURNING *`, // Возвращаем обновленную строку
                [
                    steam_id, 
                    parseInt(currency) || 0, // Убеждаемся, что это число, или 0, если нет
                    parseInt(boss_kills) || 0, 
                    parseInt(wins) || 0
                ]
            );

            if (updatedPlayer.rows.length === 0) {
                // Если игрок не найден (хотя не должен, если вы его создаете при входе)
                return res.status(404).json({ message: "Player not found for stats update." });
            }

            console.log("Player stats updated successfully:", updatedPlayer.rows[0]);
            // Отправляем **полностью обновленную** строку обратно в Lua
            res.json(updatedPlayer.rows[0]);

        } catch (error) {
            console.error("Database update error:", error);
            res.status(500).json({ message: "Error updating player stats.", error: error.message });
        }
    }
}

module.exports = new PlayerController;