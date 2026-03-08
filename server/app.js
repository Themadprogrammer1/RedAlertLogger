const alertModel = require('./models/alertModel');
const alertController = require('./controllers/alertController');
const alertView = require('./views/alertView');

const POLLING_INTERVAL = 2000; // Recommended 1-2 second polling interval

async function start() {
    await alertModel.initDB();
    alertView.renderStartMessage(POLLING_INTERVAL);

    // Begin the polling loop
    setInterval(alertController.fetchAndProcessAlerts, POLLING_INTERVAL);
}

start();
