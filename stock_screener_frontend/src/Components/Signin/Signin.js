// Signin.js
import React, { useState } from 'react';
import './Signin.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit signin data to backend API
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">LOGIN</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          className="signin-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signin-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signin-button" type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Signin;
