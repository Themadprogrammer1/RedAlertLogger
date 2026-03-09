const express = require('express');
const cors = require('cors');
const admin = require('./config/firebase'); // Require firebase admin for topic subscription
const alertModel = require('./models/alertModel');
const alertController = require('./controllers/alertController');
const alertView = require('./views/alertView');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows your web frontend to communicate with this backend
app.use(express.json());

// Subscription Endpoint
app.post('/subscribe', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).send('Token is required');
    }

    try {
        // Use the Admin SDK to subscribe the token to the topic
        const response = await admin.messaging().subscribeToTopic(token, 'all_alerts');
        console.log(`[FCM] Successfully subscribed token to topic:`, response);
        res.status(200).send('Subscribed successfully');
    } catch (error) {
        console.error(`[FCM ERROR] Error subscribing to topic:`, error.message);
        res.status(500).send('Subscription failed');
    }
});

const POLLING_INTERVAL = 2000; // Recommended 1-2 second polling interval

async function start() {
    await alertModel.initDB();

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Express server running on http://localhost:${PORT}`);
    });

    alertView.renderStartMessage(POLLING_INTERVAL);

    // Begin the polling loop
    setInterval(alertController.fetchAndProcessAlerts, POLLING_INTERVAL);
}

start();
