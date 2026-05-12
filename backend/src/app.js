const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const app = express();   // ⭐ sabse pehle app create

// ---------- MIDDLEWARES ----------

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://caption-frontend-hst6.onrender.com"
  ],
  credentials: true
}));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- ROUTES ----------

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
