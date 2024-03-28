// App.js

import React, { useState, useEffect } from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  // Check if user data is stored in local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  console.log('User in App:', user);

  const handleSignOut = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    // Reset the user state
    setUser(null);
  };

  return (
    <Router>
      <div>
        <Navbar handleSignOut={handleSignOut} user={user} />
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
