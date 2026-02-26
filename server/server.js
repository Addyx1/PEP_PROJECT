require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database (skip if SKIP_MONGODB is enabled)
if (process.env.SKIP_MONGODB !== 'true') {
    connectDB();
} else {
    console.log('MongoDB connection skipped (SKIP_MONGODB=true). Running in mock mode.');
}

// Start Server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`);
});
