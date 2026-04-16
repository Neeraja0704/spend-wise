const express = require('express');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Please provide email, password, and name' });
    }

    // In production, hash password and save to DB
    // For now, return success response
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    User login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // In production, verify against DB with hashed passwords
    // For now, return mock response
    const user = {
      id: Date.now().toString(),
      email,
      name: 'User',
      createdAt: new Date().toISOString(),
    };

    res.json({ success: true, user, token: 'mock-jwt-token' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    // In production, verify Google token
    const user = {
      id: Date.now().toString(),
      email: `user_${Date.now()}@gmail.com`,
      name: 'Google User',
      loginMethod: 'google',
      createdAt: new Date().toISOString(),
    };

    res.json({ success: true, user, token: 'mock-jwt-token' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
