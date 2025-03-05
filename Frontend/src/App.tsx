// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration'; // Import Registration

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} /> {/* Add Registration route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;