const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const path = require('path');

const app = express();   // ⭐ sabse pehle app create

// ---------- MIDDLEWARES ----------

// CORS configuration
app.use(cors({
  origin: "http://127.0.0.1:5500", // ✅ frontend ka address (without /index.html)
  credentials: true               // ✅ allow cookies
}));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // serve uploaded images

// ---------- ROUTES ----------

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ⭐ frontend fallback route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
