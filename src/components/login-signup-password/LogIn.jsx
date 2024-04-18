import React, {
  useRef, useState, useEffect, useContext,
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import './Login.css';
import Product from '../Product';

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      user: {
        email,
        password,
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        },
      );
      console.log(JSON.stringify(response?.data));
      console.log(response);
      const acessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({
        email,
        password,
        role,
        acessToken,
      });
      setEmail('');
      setPassword('');
      setSucess(true);
    } catch (error) {
      if (!error.response) {
        setErrMsg('Server is down, please try again later.');
      } else if (error.response.status === 401) {
        setErrMsg('Unauthorized, please try again.');
      } else {
        setErrMsg('Login failed , please try again.');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {sucess ? (
        <Product />
      ) : (
        <section className="login-page">
          <p ref={errRef} className={`${errMsg ? 'errMsg' : 'hidden'}`}>
            {errMsg}
          </p>
          <h1 className="login-title">LogIn</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label" htmlFor="email">
              Email:
              <input
                id="email"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
                type="email"
                placeholder="E-mail"
                className="login-input"
                required
              />
            </label>
            <label className="login-label" htmlFor="password">
              Password:
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="login-input"
                required
              />
            </label>
            <button type="submit" className="login-button">
              Log In
            </button>
            <Link to="/register" className="login-register">
              Register
            </Link>
            <div className="login-forgot">
              Have you forgotten your password?
              {' '}
              <Link to="/forgot-password">Reset it here</Link>
              .
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default LoginForm;
