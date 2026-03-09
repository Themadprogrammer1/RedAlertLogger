const alertModel = require('./models/alertModel');
const alertController = require('./controllers/alertController');
const alertView = require('./views/alertView');

const POLLING_INTERVAL = 2000;

async function start() {
    console.log('Starting Background Poller Service...');
    await alertModel.initDB();
    alertView.renderStartMessage(POLLING_INTERVAL);

    setInterval(alertController.fetchAndProcessAlerts, POLLING_INTERVAL);
}

start();
