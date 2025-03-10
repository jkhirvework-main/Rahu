/**
 * Rahu - Main Entry Point
 * A versatile project with useful features
 */

const express = require('express');
const dotenv = require('dotenv');
const rahu = require('./rahu');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Rahu API',
    version: '1.0.0'
  });
});

app.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

// Initialize Rahu
rahu.initialize();

// Start server
app.listen(port, () => {
  console.log(`Rahu server running on port ${port}`);
});

module.exports = app;