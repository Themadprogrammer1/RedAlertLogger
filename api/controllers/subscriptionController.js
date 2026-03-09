const admin = require('../config/firebase');

// Utility to ensure topic names are valid for Firebase
const sanitizeTopic = (name) => name.replace(/[^a-zA-Z0-9-_.~%]+/g, '_');

async function subscribe(req, res) {
    const { token, region } = req.body;
    if (!token || !region) return res.status(400).send('Token and region are required');

    const topic = sanitizeTopic(region);

    try {
        await admin.messaging().subscribeToTopic(token, topic);
        console.log(`[FCM] Token subscribed to topic: ${topic}`);
        res.status(200).json({ message: `Subscribed to ${region}` });
    } catch (error) {
        console.error(`[FCM ERROR] Subscribe failed for ${topic}:`, error.message);
        res.status(500).json({ error: 'Subscription failed' });
    }
}

async function unsubscribe(req, res) {
    const { token, region } = req.body;
    if (!token || !region) return res.status(400).send('Token and region are required');

    const topic = sanitizeTopic(region);

    try {
        await admin.messaging().unsubscribeFromTopic(token, topic);
        console.log(`[FCM] Token unsubscribed from topic: ${topic}`);
        res.status(200).json({ message: `Unsubscribed from ${region}` });
    } catch (error) {
        console.error(`[FCM ERROR] Unsubscribe failed for ${topic}:`, error.message);
        res.status(500).json({ error: 'Unsubscription failed' });
    }
}

module.exports = { subscribe, unsubscribe };
