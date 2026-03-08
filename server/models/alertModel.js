const client = require('../config/db');

async function initDB() {
    await client.connect();
    await client.query(`
    CREATE TABLE IF NOT EXISTS alerts (
      id VARCHAR(255) PRIMARY KEY,
      cat VARCHAR(50),
      title VARCHAR(255),
      data JSONB,
      description TEXT,
      logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
    console.log('Database initialized successfully.');
}

async function insertAlert(id, cat, title, data, desc) {
    const query = `
    INSERT INTO alerts (id, cat, title, data, description)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (id) DO NOTHING
  `;

    const res = await client.query(query, [
        String(id),
        String(cat),
        title,
        JSON.stringify(data),
        desc,
    ]);

    // Returns true if a new row was inserted, false if it was a duplicate
    return res.rowCount > 0;
}

module.exports = { initDB, insertAlert };
