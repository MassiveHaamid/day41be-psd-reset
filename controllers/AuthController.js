const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
