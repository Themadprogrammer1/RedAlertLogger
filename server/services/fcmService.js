const admin = require('../config/firebase');

async function broadcastAlert(id, cat, title, cities, desc) {
    // We can broadcast to a global "all_alerts" topic,
    // or you could loop and send to topics matching the city names.
    const topic = 'all_alerts';

    const message = {
        topic: topic,
        notification: {
            title: title || 'New Alert',
            body: desc || cities.join(', '),
        },
        data: {
            alertId: String(id),
            category: String(cat),
            cities: JSON.stringify(cities), // Native clients can parse this back into an array
            timestamp: new Date().toISOString(),
        },
        android: {
            priority: 'high', // Critical for waking up sleeping devices
        },
        apns: {
            payload: {
                aps: {
                    contentAvailable: true, // Critical for iOS background processing
                    sound: 'default',
                },
            },
        },
    };

    try {
        const response = await admin.messaging().send(message);
        console.log(`[FCM SENT] Successfully broadcasted alert ${id} to topic: ${topic}`);
        return response;
    } catch (error) {
        console.error(`[FCM ERROR] Failed to send alert ${id}:`, error.message);
    }
}

module.exports = { broadcastAlert };
