import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/" className="navbar-link">Dashboard</Link></li>
        <li className="navbar-item"><Link to="/signup" className="navbar-link">Signup</Link></li>
        <li className="navbar-item"><Link to="/signin" className="navbar-link">Signin</Link></li>
      </ul>
      {user && <span className="navbar-welcome">Welcome, {user.name}</span>}
    </nav>
  );
}

export default Navbar;
