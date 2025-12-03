const db = require("../db");
class PlayerController {
    async getOrCreatePlayer(req, res) {
        const { steam_id, currency, name } = req.body;
        const player = await db.query("SELECT * FROM player WHERE steam_id = $1", [steam_id]);
        
        if (player.rows[0]) {
            console.log("PLAYER ALREADY EXISTS"); // этот лог должен быть
            return res.json(player.rows[0]);
        }

        console.log("No matching player, creating new...");
        
        const newPlayer = await db.query(
            "INSERT INTO player (steam_id, currency, boss_kills, wins) VALUES ($1, $2, $3, $4) RETURNING *", 
            [
                steam_id, 
                0, // Изначальная валюта
                0, // Изначальные boss_kills
                0, // Изначальные wins
            ]
        );
        res.json(newPlayer.rows[0]);
    }
}

module.exports = new PlayerController;