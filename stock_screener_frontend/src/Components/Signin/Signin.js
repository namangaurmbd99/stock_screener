import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform login
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });

      // Handle successful login
      console.log('Login successful', response.data);
      setSuccessMessage('Login successful! Redirecting to dashboard...');

      // Redirect to the dashboard page after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (error) {
      // Handle login errors
      console.error('Login failed', error.response.data);
      setError(error.response.data.error || 'Login failed');
    }
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
          required
        />
        <input
          className="signin-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button className="signin-button" type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Signin;
