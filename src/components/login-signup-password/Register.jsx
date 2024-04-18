import React, { useRef, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  faCheck,
  faXmark,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Register.css';
import axios from 'axios';
import LoginForm from './LogIn';

const USER_REGEX = /^[A-z][A-z0-9-_]{2,101}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,128}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const userNameRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState('');
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [address, setAddress] = useState('');
  const [addressFocus, setAddressFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(userName);
    // console.log(result);
    // console.log(userName);
    setValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    // console.log(result);
    // console.log(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    // console.log(address);
    setAddress(address);
  }, [address]);

  useEffect(() => {
    setErrMsg('');
  }, [userName, password, email, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(userName);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg('Please enter valid information.');
      return;
    }
    const formData = {
      user: {
        username: userName,
        password,
        email,
        address,
      },
    };
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/signup',
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          Accept: '*/*',
        },
      );
      if (response.data.status === 'unprocessable_entity') {
        setErrMsg('User already exists');
        return;
      }
      console.log(response);
      console.log(response.data);
      setSucess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg('Server is not responding. Please try again later.');
      } else {
        setErrMsg('Resgistration failed. Please try again.');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {sucess ? (
        <LoginForm />
      ) : (
        <div className="signup-page">
          <div className="signup-title">SignUp</div>
          <p ref={errRef} className={`${errMsg ? 'errMsg' : 'hidden'}`}>
            {errMsg}
          </p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="username" className="signup-label">
              Username:
              <span className={`${validUserName ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={`${
                  validUserName || !userName ? 'hidden' : 'invalid'
                }`}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <input
                id="username"
                ref={userNameRef}
                type="text"
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
                aria-invalid={validUserName ? 'false' : 'true'}
                aria-describedby="userNameDesc"
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}
                placeholder="Username"
                className="signup-input"
                required
              />
            </label>
            <p
              id="userNameDesc"
              className={`${
                userNameFocus && userName && !validUserName
                  ? 'instruction'
                  : 'hidden'
              }`}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              Username must be between 3 to 100 characters, start with a
              character, numbers and underscore are allowed.
            </p>
            <label htmlFor="email" className="signup-label">
              Email:
              <span className={`${validEmail ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={`${validEmail || !email ? 'hidden' : 'invalid'}`}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <input
                id="email"
                type="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={validEmail ? 'false' : 'true'}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder="E-mail"
                className="signup-input"
                aria-describedby="emailDesc"
                required
              />
            </label>
            <p
              id="emailDesc"
              className={`${
                emailFocus && email && !validEmail ? 'instruction' : 'hidden'
              }`}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              Enter a valid Email, it can contain (_ , - , @, .), uppercase and
              numbers.
            </p>
            <label htmlFor="password" className="signup-label">
              Password:
              <span className={`${validPassword ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={`${
                  validPassword || !password ? 'hidden' : 'invalid'
                }`}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={validPassword ? 'false' : 'true'}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                aria-describedby="passwordDesc"
                placeholder="Password"
                className="signup-input"
                required
              />
            </label>
            <p
              id="passwordDesc"
              className={`${
                passwordFocus && !validPassword ? 'instruction' : 'hidden'
              }`}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              Password must be 6 to 128 characters, contain at least one
              uppercase letter, one lowercase letter, one number and one of
              (!,#,$,%,@) special characters.
            </p>
            <label htmlFor="address" className="signup-label">
              Address:
              <span className={`${address ? 'valid' : 'hidden'}`}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {/* <span className={`${!address ? "hidden" : "invalid"}`}>
                <FontAwesomeIcon icon={faXmark} />
              </span> */}
              <input
                id="address"
                type="text"
                // autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                onFocus={() => setAddressFocus(true)}
                onBlur={() => setAddressFocus(false)}
                aria-describedby="addressDesc"
                className="signup-input"
                required
              />
            </label>
            <p
              id="addressDesc"
              className={`${
                addressFocus && !address ? 'instruction' : 'hidden'
              }`}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              Please enter valid address.
            </p>
            <button
              type="submit"
              className="signup-button"
              disabled={
                !!(!validUserName || !validEmail || !validPassword || !address)
              }
            >
              Sign Up
            </button>
            <Link to="/login" className="signup-login">
              Already have an account? Log in
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
