const express = require('express');
// import cors
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const config = require('./utils/config');

const app = express();

// set the strictQuery option to false to allow for querying by id
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(config.mongoURI)
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
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
