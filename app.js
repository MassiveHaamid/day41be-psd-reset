const express = require('express');
// import cors
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const config = require('./utils/config');

const app = express();

// set the strictQuery option to false to allow for querying by id
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// use the cors middleware
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
