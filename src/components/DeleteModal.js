import React from 'react';

function DeleteModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal modal-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon warning">⚠️</div>
        <div className="modal-header">Delete Transaction?</div>
        <p className="modal-description">
          This action cannot be undone. The transaction will be permanently deleted.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Keep it
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
