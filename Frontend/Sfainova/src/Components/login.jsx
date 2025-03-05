import React, { useState } from 'react';
import { Mail, Key, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('employee'); // Default role
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulated signup validation
      if (!email || !password || !confirmPassword || !fullName) {
        throw new Error('Please fill in all fields');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success (redirect to login or dashboard in a real app)
      alert('Signup successful! Please log in.');
      window.location.href = '/admin-login';
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl h-screen flex">
        {/* Left side: Tech-themed illustration */}
        <div className="hidden md:flex illustration-panel h-full bg-gradient-to-br from-blue-600 to-cyan-500 items-center justify-center">
          <div className="tech-illustration bg-cover bg-center w-full h-full"></div>
        </div>

        {/* Right side: Signup form */}
        <div className="form-panel h-full flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900">SafaiNova</h1>
              <p className="text-gray-600 mt-2 text-lg">Create your account to manage waste smarter</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-8">
              <div className="input-group">
                <label htmlFor="fullName" className="label text-sm font-medium text-gray-700">Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email" className="label text-sm font-medium text-gray-700">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., user@blinkit.com"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password" className="label text-sm font-medium text-gray-700">Password</label>
                <div className="input-wrapper">
                  <Key className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a strong password"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword" className="label text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="input-wrapper">
                  <Key className="input-icon" />
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="role" className="label text-sm font-medium text-gray-700">Role</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="select"
                    required
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
              </div>

              {error && <p className="error text-sm text-red-500 text-center">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="icon animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <span className="flex items-center justify-center gap-2">Sign Up</span>
                )}
              </button>
            </form>

            {/* Login Option */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/admin-login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;