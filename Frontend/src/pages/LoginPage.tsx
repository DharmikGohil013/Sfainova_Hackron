// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  RecycleIcon, Fingerprint, Mail, Key, Building2, Loader2,
  ChevronRight, UserCircle, ShieldCheck, ClipboardList
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

type LoginMethod = 'employee' | 'partner' | 'admin';
type EmployeeRole = 'technician' | 'logistics' | 'supervisor';

interface FormData {
  employeeId: string;
  email: string;
  password: string;
  pin: string;
  role?: EmployeeRole;
}

const LoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('employee');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    employeeId: '',
    email: '',
    password: '',
    pin: '',
    role: 'technician',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validation
      if (loginMethod === 'employee' && (!formData.employeeId || !formData.pin)) {
        throw new Error('Please fill in Employee ID and PIN');
      }
      if (loginMethod === 'partner' && (!formData.email || !formData.password)) {
        throw new Error('Please fill in Email and Password');
      }
      if (loginMethod === 'admin' && (!formData.email || !formData.password)) {
        throw new Error('Please fill in Email and Password');
      }

      // Success notification
      const roleMessage = {
        employee: 'Welcome back, Waste Management Professional!',
        partner: 'Welcome to your Partner Dashboard!',
        admin: 'Welcome, Administrator!',
      }[loginMethod];

      toast.success(roleMessage);

      // Simulate redirect delay (replace with actual navigation logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLoginMethodIcon = (method: LoginMethod) => {
    switch (method) {
      case 'employee':
        return <UserCircle className="w-5 h-5" />;
      case 'partner':
        return <Building2 className="w-5 h-5" />;
      case 'admin':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="p-4">
        <Link
          to="/"
          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
          Back to Homepage
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RecycleIcon className="w-12 h-12 text-emerald-500" />
              <h1 className="text-3xl font-bold">SafaiNova</h1>
            </div>
            <p className="text-gray-400">Smart Waste Management Platform</p>
          </div>

          {/* Login Container */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-8">
            {/* Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {(['employee', 'partner', 'admin'] as LoginMethod[]).map((method) => (
                <button
                  key={method}
                  onClick={() => setLoginMethod(method)}
                  className={`py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors capitalize ${
                    loginMethod === method
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {getLoginMethodIcon(method)}
                  {method}
                </button>
              ))}
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {loginMethod === 'employee' ? (
                <>
                  <div className="space-y-2">
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300">
                      Employee ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        placeholder="e.g., WM-12345"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <UserCircle className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                      Role
                    </label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none"
                      >
                        <option value="technician">Waste Technician</option>
                        <option value="logistics">Logistics Coordinator</option>
                        <option value="supervisor">Supervisor</option>
                      </select>
                      <ClipboardList className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-300">
                      PIN
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="pin"
                        name="pin"
                        placeholder="Enter your PIN"
                        maxLength={6}
                        value={formData.pin}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <Key className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <Key className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    {getLoginMethodIcon(loginMethod)}
                    Login as {loginMethod}
                  </>
                )}
              </button>
            </form>

            {/* Forgot PIN/Password */}
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300">
                Forgot your {loginMethod === 'employee' ? 'PIN' : 'password'}?
              </a>
            </div>

            {/* Biometric Login for Employees */}
            {loginMethod === 'employee' && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Fingerprint className="w-5 h-5" />
                  Login with Biometric
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;