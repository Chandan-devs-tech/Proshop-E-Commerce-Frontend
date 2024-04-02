// import React from 'react';

// const LoginForm = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div
//       className="container-fluid p-0"
//       style={{
//         backgroundColor: '#00FF00',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <div className="row justify-content-center w-100 m-0">
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit}>
//             <h2 className="text-center mb-4">Log in to your account</h2>
//             <div className="mb-3">
//               <label htmlFor="email-input" className="form-label">
//                 E-mail
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email-input"
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 required
//               />
//             </div>
//             <div className="d-grid gap-2">
//               <button type="submit" className="btn btn-primary">
//                 Log In
//               </button>
//               <button type="button" className="btn btn-secondary">
//                 Register
//               </button>
//             </div>
//             <p className="mt-3 text-center">
//               Have you forgotten your password?
//               {' '}
//               <a href="/forgot-password">Reset it here</a>
//               .
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-title">Log in to your account</div>
        <input
          type="email"
          placeholder="E-mail"
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Log In
        </button>
        <Link to="/register" className="login-register">
          Register
        </Link>
        <div className="login-forgot">
          Have you forgotten your password?{" "}
          <Link to="/forgot-password">
            Reset it here
          </Link>
          .
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
