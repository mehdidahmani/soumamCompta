require('module-alias/register');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(compression());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/idurar-erp-crm', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Import routes
const coreRoutes = require('./routes/coreRoutes/coreApi');
const appRoutes = require('./routes/appRoutes/appApi');

// Routes
app.use('/api', coreRoutes);
app.use('/api', appRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    result: null,
    message: err.message || 'Internal Server Error',
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    result: null,
    message: 'API endpoint not found',
  });
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;