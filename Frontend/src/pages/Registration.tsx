// src/pages/Registration.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Key, User, Phone, ChevronRight, Loader2 } from 'lucide-react'; // Added Loader2
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Store Manager',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.username ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        throw new Error('Please fill in all fields');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Registration successful! Please log in.');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/login'); // Redirect to login page instead of '/'
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Toaster position="top-right" />
      <header className="p-4">
        <button
          onClick={() => navigate('/login')} // Changed to '/login' for consistency
          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
          Back to Login
        </button>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Register with SafaiNova</h1>
            <p className="text-gray-400 mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <Key className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <Key className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Employee">Employee</option>
                <option value="Partner">Partner</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;