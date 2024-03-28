// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ handleSignOut, user }) {
  console.log('User in Navbar:', user);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/" className="navbar-link">Dashboard</Link></li>
        {user ? (
          <>
            <li className="navbar-item">
              <Link onClick={handleSignOut} className="navbar-link">Signout</Link>
            </li>
            <li className="navbar-item">
              <span className="navbar-welcome">{user.user.email}</span>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item"><Link to="/signup" className="navbar-link">Signup</Link></li>
            <li className="navbar-item"><Link to="/signin" className="navbar-link">Signin</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
