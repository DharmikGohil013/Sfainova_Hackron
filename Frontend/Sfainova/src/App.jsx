import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard'; // Placeholder for after login

function App() {
  const [userRole, setUserRole] = useState(null); // Track logged-in user role

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/">Home</Link>
          {!userRole && <Link to="/admin-login">Admin Login</Link>}
          {userRole && <Link to="/dashboard">Dashboard</Link>}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin setUserRole={setUserRole} />} />
          <Route path="/dashboard" element={<Dashboard role={userRole} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;