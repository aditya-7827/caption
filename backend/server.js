require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

// DB connect
connectDB();

// ⭐ IMPORTANT
module.exports = app;
