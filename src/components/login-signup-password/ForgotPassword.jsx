// ForgotPassword.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPasswordForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="forgot-password-title">Forgot Password</div>
        <input
          type="email"
          placeholder="E-mail"
          className="forgot-password-input"
          required
        />
        <button type="submit" className="forgot-password-button">
          Reset Password
        </button>
        <Link to="/login" className="forgot-password-login">
          Remembered your password? Log in
        </Link>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
