import React, { useState } from 'react';

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Bonus', 'Investment', 'Other Income'],
  expense: ['Food', 'Travel', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other']
};

function TransactionForm({ onAddTransaction }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      date,
      note
    });

    // Reset form
    setAmount('');
    setNote('');
    setCategory(CATEGORIES[type][0]);
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="transaction-form">
      <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
        ➕ Add New Transaction
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Type Toggle */}
        <div className="type-toggle">
          {['income', 'expense'].map(t => (
            <button
              key={t}
              type="button"
              className={`type-option ${t} ${type === t ? 'active' : ''}`}
              onClick={() => {
                setType(t);
                setCategory(CATEGORIES[t][0]);
              }}
            >
              {t === 'income' ? '💰 Income' : '💸 Expense'}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES[type].map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Note */}
        <div className="form-group">
          <label htmlFor="note">Note (Optional)</label>
          <input
            id="note"
            type="text"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            💾 Add Transaction
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setAmount('');
              setNote('');
              setCategory(CATEGORIES[type][0]);
              setDate(new Date().toISOString().split('T')[0]);
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
