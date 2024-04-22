// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Create an Express application
const app = express();

// Set up Winston logger
const logger = winston.createLogger({
  level: 'info', // Log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'logfile.log' }) // Log to file
  ]
});

// Log unhandled exceptions
process.on('uncaughtException', (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (ex) => {
  throw ex;
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/IshaqBlogApi')
  .then(() => logger.info('MongoDB connected'))
  .catch(err => {
    logger.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Middleware
app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
