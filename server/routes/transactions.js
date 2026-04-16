const express = require('express');
const router = express.Router();

// @route   GET /api/transactions
// @desc    Get all transactions for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Mock response - in production, fetch from MongoDB
    res.json({ success: true, transactions: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/transactions
// @desc    Create new transaction
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { userId, type, amount, category, description, date } = req.body;

    // Validation
    if (!userId || !type || !amount || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }

    // Mock response - in production, save to MongoDB
    const transaction = {
      id: Date.now().toString(),
      userId,
      type,
      amount,
      category,
      description,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!id || !userId) {
      return res.status(400).json({ error: 'Transaction ID and User ID required' });
    }

    // Mock response - in production, delete from MongoDB
    res.json({ success: true, message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!id || !userId) {
      return res.status(400).json({ error: 'Transaction ID and User ID required' });
    }

    // Mock response - in production, update in MongoDB
    res.json({ success: true, message: 'Transaction updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/transactions/export/csv
// @desc    Export transactions to CSV
// @access  Private
router.get('/export/csv', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Mock CSV export - in production, generate from MongoDB
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="transactions.csv"');
    res.send('Date,Type,Category,Amount,Description\n');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
