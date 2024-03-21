import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/', {
        email,
        password,
      });

      // Handle successful signup
      console.log('Signup successful', response.data);
    } catch (error) {
      // Check if error.response exists before accessing it
      if (error.response) {
        console.error('Signup failed', error.response.data);
        setError(error.response.data.error || 'Signup failed');
      } else {
        console.error('Signup failed', error.message);
        setError('Signup failed');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">SIGNUP</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button className="signup-button" type="submit">SIGNUP</button>
      </form>
    </div>
  );
}

export default Signup;
