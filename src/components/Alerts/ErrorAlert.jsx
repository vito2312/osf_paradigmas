import React from 'react';

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="error-alert">
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ErrorAlert;
