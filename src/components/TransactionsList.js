import React from 'react';

const CATEGORY_ICONS = {
  // Income
  'Salary': '💼',
  'Freelance': '🎯',
  'Bonus': '🎁',
  'Investment': '📈',
  'Other Income': '💵',
  // Expense
  'Food': '🍽️',
  'Travel': '✈️',
  'Bills': '📄',
  'Entertainment': '🎬',
  'Shopping': '🛍️',
  'Health': '⚕️',
  'Education': '📚',
  'Other': '📌'
};

function TransactionsList({ transactions, onDeleteTransaction, formatCurrency }) {
  if (transactions.length === 0) {
    return (
      <div className="transactions-list">
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No transactions yet</div>
          <div className="empty-state-message">
            Start tracking your finances by adding your first income or expense
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions-list">
      {transactions.map((transaction) => (
        <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
          <div className="transaction-left">
            <div className={`transaction-icon ${transaction.type}`}>
              {CATEGORY_ICONS[transaction.category] || '💰'}
            </div>
            <div className="transaction-info">
              <div className="transaction-category">{transaction.category}</div>
              {transaction.note && (
                <div className="transaction-note">{transaction.note}</div>
              )}
              <div className="transaction-date">
                {new Date(transaction.date).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          <div className="transaction-right">
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount).replace('₹ ', '')}
            </div>
            <button
              className="btn-delete"
              onClick={() => onDeleteTransaction(transaction.id)}
              title="Delete transaction"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
