const express = require('express');
const router = express.Router();

// @route   GET /api/budget
// @desc    Get user's budget
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Mock response
    const budget = {
      userId,
      amount: 5000,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      spent: 0,
      remaining: 5000,
    };

    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/budget
// @desc    Update user's budget
// @access  Private
router.put('/', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ error: 'User ID and amount required' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Budget amount must be positive' });
    }

    // Mock response - in production, update in MongoDB
    const budget = {
      userId,
      amount,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      updatedAt: new Date().toISOString(),
    };

    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/budget/status
// @desc    Get budget status (safe/warning/exceeded)
// @access  Private
router.get('/status', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Mock response
    const status = {
      percentage: 65,
      status: 'safe', // safe, warning, exceeded
      message: 'You are within budget',
    };

    res.json({ success: true, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
