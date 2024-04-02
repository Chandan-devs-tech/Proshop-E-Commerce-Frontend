// SignUp.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUpForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-title">Create an account</div>
        <input
          type="email"
          placeholder="E-mail"
          className="signup-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="signup-input"
          required
        />
        <input
          type="text"
          placeholder="Role"
          className="signup-input"
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="signup-input"
          required
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <Link to="/login" className="signup-login">
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
