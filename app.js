const { Client } = require("pg");

const POLLING_INTERVAL = 2000; // Recommended 1-2 second polling interval
const API_URL = "https://www.oref.org.il/WarningMessages/alert/alerts.json";

// Initialize PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  await client.connect();
  // Create table if it doesn't exist
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
  console.log("Database initialized successfully.");
}

async function fetchAlerts() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Referer: "https://www.oref.org.il/",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) return;

    let text = await response.text();

    // The API frequently returns an empty response when there are no active alerts
    if (!text || text.trim() === "") return;

    // Sanitize the Byte Order Mark (BOM) anomaly
    if (text.charCodeAt(0) === 0xfeff) {
      text = text.substring(1);
    }

    const payload = JSON.parse(text);

    // Validate payload presence
    if (!payload || !payload.id) return;

    const { id, cat, title, data, desc } = payload;

    // Insert into DB. The ON CONFLICT ensures we don't log duplicate active alerts.
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

    if (res.rowCount > 0) {
      console.log(
        `[ALERT LOGGED] ID: ${id} | Category: ${cat} | Cities: ${data.join(", ")}`,
      );
    }
  } catch (err) {
    console.error("Error fetching or parsing alerts:", err.message);
  }
}

async function start() {
  await initDB();
  console.log(`Starting High-Frequency Polling every ${POLLING_INTERVAL}ms...`);
  setInterval(fetchAlerts, POLLING_INTERVAL);
}

start();
