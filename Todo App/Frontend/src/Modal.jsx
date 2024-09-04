import React from "react";
import "./Modal.css"; // Ensure you create this CSS file for styling

function Modal({ show, onClose, onConfirm, title, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-confirm">
            Confirm
          </button>
          <button onClick={onClose} className="modal-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
