import { Trash2 } from "lucide-react";
import React from "react";

const Modal = ({ isModalOpen, onModalClose, handleDelete }) => {
  if (!isModalOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onModalClose}>
        <div className="custom-modal">
          <div className="modal-icon">
            <Trash2 color="#ef4444" size={48} />
          </div>
          <p className="modal-text">
            Are you sure you want to delete this project?
          </p>
          <div className="modal-footer">
            <button className="button cancel-btn" onClick={onModalClose}>
              Cancel
            </button>
            <button className="button save-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
