const express = require('express');
const router = express.Router();

// @route   GET /api/analytics/insights
// @desc    Get AI insights about spending
// @access  Private
router.get('/insights', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Mock insights
    const insights = [
      '💡 Your highest spending is on Food (₹5,240)',
      '📈 You spent 15% more this month compared to last month',
      '⚠️ You are approaching your budget limit (80% used)',
      '✅ Great job! Fixed expenses are within target',
    ];

    res.json({ success: true, insights });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/analytics/trends
// @desc    Get monthly trends
// @access  Private
router.get('/trends', async (req, res) => {
  try {
    const { userId, months = 12 } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Mock trends data
    const trends = [
      { month: 'Jan', income: 50000, expense: 35000 },
      { month: 'Feb', income: 50000, expense: 38000 },
      { month: 'Mar', income: 55000, expense: 40000 },
    ];

    res.json({ success: true, trends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/analytics/category-breakdown
// @desc    Get spending by category
// @access  Private
router.get('/category-breakdown', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Mock category breakdown
    const breakdown = [
      { category: 'Food', amount: 5240, percentage: 32 },
      { category: 'Transport', amount: 3100, percentage: 19 },
      { category: 'Entertainment', amount: 2800, percentage: 17 },
      { category: 'Bills', amount: 4500, percentage: 27 },
      { category: 'Other', amount: 500, percentage: 5 },
    ];

    res.json({ success: true, breakdown });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
