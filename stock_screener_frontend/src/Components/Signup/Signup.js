import React, { useState } from 'react';
import { signupUser } from '../../api';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
    const { email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Call the signupUser function from the api module
      await signupUser(email, password);

      // Handle successful signup
      setSuccessMessage('User created successfully! Redirecting to sign-in page...');
      // Redirect to the sign-in page after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/signin';
      }, 1500);
    } catch (error) {
      // Handle signup errors
      console.error('Signup failed', error);
      setError(error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">SIGNUP</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          className="signup-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button className="signup-button" type="submit">SIGNUP</button>
      </form>
    </div>
  );
}

export default Signup;
