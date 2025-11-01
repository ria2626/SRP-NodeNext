const express = require("express");
const mongoose = require("mongoose"); // ✅ fixed typo
const cors = require("cors");
require('dotenv').config();
const path = require("path");
const uploadRoutes = require("./routes/upload");
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoutes);

app.use('/api/listings', productRoutes); // This enables /products route
app.use('/api/categories', categoryRoutes); // This enables /products route
app.use('/api/auth/register', registerRoutes); // This enables /products route
app.use('/api/auth/login', loginRoutes); // This enables /products route

app.get('/', (req, res) => res.send('API running'));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Backend is running')))
  .catch(err => console.error('MongoDB connection error:', err));
