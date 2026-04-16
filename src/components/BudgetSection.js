import React from 'react';

function BudgetSection({ budget, totalExpense, remainingBudget, budgetPercentage, onSetBudget, formatCurrency }) {
  const isWarning = budgetPercentage > 80 && budgetPercentage <= 100;
  const isDanger = budgetPercentage > 100;

  return (
    <div className="budget-section">
      <div className="budget-header">
        <div className="budget-title">💰 Monthly Budget</div>
        <button className="btn-set-budget" onClick={onSetBudget}>
          ⚙️ Update
        </button>
      </div>

      <div className="budget-content">
        <div className="budget-item">
          <div className="budget-label">Budget Limit</div>
          <div className="budget-amount">{formatCurrency(budget.amount)}</div>
        </div>

        <div className="budget-item">
          <div className="budget-label">Amount Spent</div>
          <div className="budget-amount" style={{ color: isDanger ? 'var(--expense-color)' : 'var(--income-color)' }}>
            {formatCurrency(totalExpense)}
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className={`progress-fill ${isWarning ? 'warning' : isDanger ? 'danger' : ''}`}
                style={{ width: `${budgetPercentage}%` }}
              ></div>
            </div>
            <div className="progress-text">{budgetPercentage.toFixed(0)}% used</div>
          </div>
        </div>

        <div className={`budget-status ${isWarning ? 'warning' : isDanger ? 'danger' : ''}`}>
          {isDanger ? (
            <div>
              <div className="status-icon">🚨</div>
              <div>
                <div className="status-title">Over Budget</div>
                <div className="status-detail">
                  Exceeded by {formatCurrency(Math.abs(remainingBudget))}
                </div>
              </div>
            </div>
          ) : isWarning ? (
            <div>
              <div className="status-icon">⚠️</div>
              <div>
                <div className="status-title">Approaching Limit</div>
                <div className="status-detail">
                  {formatCurrency(Math.abs(remainingBudget))} remaining
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="status-icon">✓</div>
              <div>
                <div className="status-title">Within Budget</div>
                <div className="status-detail">
                  {formatCurrency(remainingBudget)} remaining
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetSection;
