const admin = require('firebase-admin');

try {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
    console.log('Firebase Admin initialized successfully.');
} catch (error) {
    console.error('Firebase initialization error:', error.message);
}

module.exports = admin;
