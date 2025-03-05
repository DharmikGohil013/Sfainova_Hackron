import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from '../src/Components/AdminLogin';
import AdminLogin from '../src/Components/Dashboard';
import Dashboard from '../src/Components/home'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./Navbar/nav";
// Placeholder for after login

function App() {
  const [userRole, setUserRole] = useState(null); // Track logged-in user role

  return (
    <Router>
       <Nav />
      <div className="app">
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