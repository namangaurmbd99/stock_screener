// Signin.js

import React, { useState } from 'react';
import { loginUser } from '../../api';
import './Signin.css';

function Signin({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await loginUser(formData.email, formData.password);
      setUser(userData); // Update the user state with logged-in user data

      // Store the user data in local storage
      localStorage.setItem('user', JSON.stringify(userData));

      setSuccessMessage('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      console.error('Login failed', error);
      setError(error);
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">LOGIN</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          className="signin-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="signin-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
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
