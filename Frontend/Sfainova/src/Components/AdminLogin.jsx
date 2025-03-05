import React, { useState, useEffect } from 'react';
import {
  Fingerprint, Mail, Key, Building2, UserCircle, Loader2, ChevronRight
} from 'lucide-react';

function AdminLogin({ setUserRole }) {
  const [loginMethod, setLoginMethod] = useState('email'); // Default to Email + Password
  const [employeeId, setEmployeeId] = useState('');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ssoProvider, setSsoProvider] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  // Simulated biometric check
  useEffect(() => {
    setIsBiometricAvailable(window.innerWidth <= 768); // Simulated for mobile
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      switch (loginMethod) {
        case 'employee':
          if (employeeId === 'EMP123' && pin === '4567') {
            setUserRole('Employee');
            window.location.href = '/dashboard';
          } else {
            throw new Error('Invalid Employee ID or PIN');
          }
          break;
        case 'email':
          if (email === 'admin@blinkit.com' && password === 'admin123') {
            setUserRole('Super Admin');
            window.location.href = '/dashboard';
          } else {
            throw new Error('Invalid email or password');
          }
          break;
        case 'sso':
          if (ssoProvider === 'zomato') {
            setUserRole('Admin');
            window.location.href = '/dashboard';
          } else {
            throw new Error('SSO authentication failed');
          }
          break;
        case 'biometric':
          setUserRole('Employee');
          window.location.href = '/dashboard';
          break;
        default:
          throw new Error('Please select a valid login method');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getLoginMethodIcon = (method) => {
    switch (method) {
      case 'employee': return <UserCircle className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'sso': return <Building2 className="w-5 h-5" />;
      case 'biometric': return <Fingerprint className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <header className="mb-8">
          <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors">
            <ChevronRight className="w-5 h-5" />
            Back to Homepage
          </a>
        </header>

        {/* Login Container */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl font-bold">WasteWatch</span>
            </div>
            <p className="text-gray-400">Smart Waste Management Platform</p>
          </div>

          {/* Login Method Selector */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {['employee', 'email', 'sso', ...(isBiometricAvailable ? ['biometric'] : [])].map((method) => (
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
                {method === 'email' ? 'Email Login' : method}
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {loginMethod === 'employee' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300">
                    Employee ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="employeeId"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="e.g., EMP123"
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                    <UserCircle className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
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
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter 4-digit PIN"
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                    <Key className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>
                <p className="text-sm text-gray-400">For technicians managing automated systems.</p>
              </>
            )}

            {loginMethod === 'email' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., admin@blinkit.com"
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                    <Key className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>
                <p className="text-sm text-gray-400">For admins or dark store partners.</p>
              </>
            )}

            {loginMethod === 'sso' && (
              <div className="space-y-2">
                <label htmlFor="ssoProvider" className="block text-sm font-medium text-gray-300">
                  SSO Provider
                </label>
                <div className="relative">
                  <select
                    id="ssoProvider"
                    value={ssoProvider}
                    onChange={(e) => setSsoProvider(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none"
                    required
                  >
                    <option value="">Select Provider</option>
                    <option value="zomato">Zomato SSO</option>
                    <option value="blinkit">Blinkit SSO</option>
                  </select>
                  <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                </div>
                <p className="text-sm text-gray-400">For enterprise clients like Blinkit.</p>
              </div>
            )}

            {loginMethod === 'biometric' && (
              <div className="text-center">
                <p className="text-gray-400 mb-4">Press the button to authenticate with biometrics</p>
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
                      <Fingerprint className="w-5 h-5" />
                      Scan Fingerprint/Face
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-400 mt-4">For field staff using mobile devices.</p>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {loginMethod !== 'biometric' && (
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
                    Login as {loginMethod === 'email' ? 'Admin' : loginMethod}
                  </>
                )}
              </button>
            )}
          </form>

          {/* Additional Options */}
          {loginMethod !== 'biometric' && (
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300">
                Forgot your {loginMethod === 'employee' ? 'PIN' : 'password'}?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;