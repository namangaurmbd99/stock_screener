import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
