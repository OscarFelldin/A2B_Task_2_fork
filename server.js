require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes'); 
const userRoutes = require('./src/routes/userRoutes'); 
const accountRoutes = require('./src/routes/accountRoutes'); 
const errorHandler = require('./src/middleware/errorHandler'); 
const authMiddleware = require('./src/middleware/auth'); 
const apiLogger = require('./src/middleware/apiLogger');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(apiLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/accounts', authMiddleware, accountRoutes);

// Error handling
app.use(errorHandler);

// Catch-all route for API 404s
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

const PORT = process.env.PORT || 3000;

// Database connection and server start
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Serve login page for root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Serve dashboard page for root route
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});