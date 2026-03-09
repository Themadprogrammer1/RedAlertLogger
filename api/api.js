const express = require('express');
const cors = require('cors');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount the routes under /api
app.use('/api', subscriptionRoutes);

app.listen(PORT, () => {
    console.log(`Subscription API server running on port ${PORT}`);
});
