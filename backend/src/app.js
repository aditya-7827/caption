const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

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

// ---------- ROUTES ----------

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
