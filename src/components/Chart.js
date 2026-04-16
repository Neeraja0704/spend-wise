import React from 'react';

function Chart({ totalIncome, totalExpense }) {
  const maxValue = Math.max(totalIncome, totalExpense, 1);
  const incomeHeight = (totalIncome / maxValue) * 100;
  const expenseHeight = (totalExpense / maxValue) * 100;

  return (
    <div className="chart-container">
      <div className="chart-title">📊 Income vs Expense</div>
      <div className="chart-bars">
        <div className="chart-bar-group">
          <div
            className="chart-bar income"
            style={{ height: `${incomeHeight}%` }}
            title={`Income: ₹${totalIncome.toFixed(2)}`}
          ></div>
          <div className="chart-label">Income</div>
          <div className="chart-value">₹{totalIncome.toFixed(0)}</div>
        </div>

        <div className="chart-bar-group">
          <div
            className="chart-bar expense"
            style={{ height: `${expenseHeight}%` }}
            title={`Expense: ₹${totalExpense.toFixed(2)}`}
          ></div>
          <div className="chart-label">Expense</div>
          <div className="chart-value">₹{totalExpense.toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
