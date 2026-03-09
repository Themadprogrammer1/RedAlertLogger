const alertModel = require('../models/alertModel');
const alertView = require('../views/alertView');
const fcmService = require('../services/fcmService');

const API_URL = 'https://www.oref.org.il/WarningMessages/alert/alerts.json';

async function fetchAndProcessAlerts() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                Referer: 'https://www.oref.org.il/',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) return;

        let text = await response.text();

        // The API frequently returns an empty response when there are no active alerts
        if (!text || text.trim() === '') return;

        // Sanitize the Byte Order Mark (BOM) anomaly
        if (text.charCodeAt(0) === 0xfeff) {
            text = text.substring(1);
        }

        const payload = JSON.parse(text);

        // Validate payload presence
        if (!payload || !payload.id) return;

        const { id, cat, title, data, desc } = payload;

        // Pass data to the Model
        const wasInserted = await alertModel.insertAlert(id, cat, title, data, desc);

        // If successfully inserted (not a duplicate), update the View
        if (wasInserted) {
            alertView.renderNewAlert(id, cat, data);
            await fcmService.broadcastAlert(id, cat, title, data, desc);
        }
    } catch (err) {
        alertView.renderError(`Fetching or parsing alerts: ${err.message}`);
    }
}

module.exports = { fetchAndProcessAlerts };
