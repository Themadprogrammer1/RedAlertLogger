function renderNewAlert(id, cat, data) {
    console.log(`[ALERT LOGGED] ID: ${id} | Category: ${cat} | Cities: ${data.join(', ')}`);
}

function renderError(message) {
    console.error(`Error: ${message}`);
}

function renderStartMessage(interval) {
    console.log(`Starting High-Frequency Polling every ${interval}ms...`);
}

module.exports = { renderNewAlert, renderError, renderStartMessage };
