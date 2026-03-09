const admin = require('firebase-admin');

// Initialize Firebase Admin
// It automatically looks for the GOOGLE_APPLICATION_CREDENTIALS env variable
try {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
    console.log('Firebase Admin initialized successfully.');
} catch (error) {
    console.error('Firebase initialization error:', error.message);
}

module.exports = admin;
