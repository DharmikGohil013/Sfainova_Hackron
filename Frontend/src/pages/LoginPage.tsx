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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLoginMethodIcon = (method: LoginMethod) => {
    switch (method) {
      case 'employee':
        return <UserCircle />;
      case 'partner':
        return <Building2 />;
      case 'admin':
        return <ShieldCheck />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-gray-100">
      {/* Header */}
      <header className="p-4">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">
          Back to Homepage
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-md w-full mx-auto p-8 rounded-xl shadow-xl bg-gray-800 mt-8">
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">SafaiNova</h1>
          <p className="text-sm text-gray-400">Smart Waste Management Platform</p>
        </div>

        {/* Login Container */}
        <div>
          {/* Role Selection Tabs */}
          <div className="flex gap-2 mb-6">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {loginMethod === 'employee' ? (
              <>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="Enter your Employee ID"
                    className="w-full py-3 px-4 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="technician">Waste Technician</option>
                    <option value="logistics">Logistics Coordinator</option>
                    <option value="supervisor">Supervisor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">PIN</label>
                  <input
                    type="password"
                    name="pin"
                    value={formData.pin}
                    onChange={handleInputChange}
                    placeholder="Enter your PIN"
                    className="w-full py-3 px-4 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full py-3 px-4 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full py-3 px-4 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="py-3 px-4 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Authenticating...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-4 text-center">
            <Link to="/register" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              Don't have an account? Register here
            </Link>
          </div>

          {/* Forgot PIN/Password */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              Forgot your {loginMethod === 'employee' ? 'PIN' : 'password'}?
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;