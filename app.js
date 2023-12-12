const express = require('express');
// import cors
const cors = require('cors');
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

// Sample user data (replace with a database in a real application)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
