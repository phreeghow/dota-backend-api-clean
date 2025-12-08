// db.js
const Pool = require('pg').Pool;
const connectionString = process.env.DATABASE_URL; 

if (!connectionString) {
    console.error("FATAL ERROR: DATABASE_URL is not set!");
    process.exit(1); 
}

const pool = new Pool({
    connectionString: connectionString, 
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;