const express = require('express');
const cors = require('cors');
const admin = require('./firebase');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/subscribe', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).send('Token is required');

    try {
        const response = await admin.messaging().subscribeToTopic(token, 'all_alerts');
        console.log(`[FCM] Successfully subscribed token to topic`);
        res.status(200).send('Subscribed successfully');
    } catch (error) {
        console.error(`[FCM ERROR] Error subscribing to topic:`, error.message);
        res.status(500).send('Subscription failed');
    }
});

app.listen(PORT, () => {
    console.log(`Subscription API server running on port ${PORT}`);
});
