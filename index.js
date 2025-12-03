const express = require("express");
const playerRouter = require("./routes/player.routers");
const PORT = 8080;
const app = express();

app.use(express.json());
app.use("/api", playerRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});