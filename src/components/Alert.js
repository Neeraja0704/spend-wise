import React from 'react';

function Alert({ message, type = 'success' }) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`alert ${type}`}>
      <span className="alert-icon">{getIcon()}</span>
      <span>{message}</span>
    </div>
  );
}

export default Alert;
