import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import axios from 'axios';
import Login from './LogIn';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [sucess, setSucess] = useState(false);
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/users/passwords/forgot',
        JSON.stringify({ email }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        },
      );
      console.log(response?.data);
      console.log(response);
      setEmail('');
      setSucess(true);
    } catch (error) {
      if (!error.response) {
        setErrMsg('Server is down, please try again later.');
      } else if (error.response.status === 404) {
        setErrMsg('Email not found, please try again.');
      } else {
        setErrMsg('Server Error, please try again.');
      }
    }
  };

  return (
    <>
      {sucess ? (
        <Login />
      ) : (
        <section className="forgot-password-page">
          <p className={`${errMsg ? 'errMsg' : 'hidden'}`}>{errMsg}</p>
          <div className="forgot-password-title">Forgot Password</div>
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
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
        </section>
      )}
    </>
  );
};

export default ForgotPasswordForm;
