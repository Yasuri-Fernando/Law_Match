import React, { useState } from 'react';
import './ForgotPasswordModal.css'; // We'll create the styles later

const ForgotPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false); // To control modal visibility

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  return (
    <>
      {/* Link/Button to open the modal */}
      <a href="#" onClick={toggleModal} className="forgot-password-btn">
        Forgot Password?
      </a>

      {/* Modal structure */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Forgot Your Password?</h2>
            <p>This feature is currently unavailable. Please contact support for assistance.</p>
            <div className="modal-actions">
              <button onClick={toggleModal} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;
