import React, { useState, useEffect } from 'react';
import {
  Fingerprint, Mail, Key, Building2, UserCircle, Loader2, ChevronRight
} from 'lucide-react';

function AdminLogin({ setUserRole }) {
  const [loginMethod, setLoginMethod] = useState('email');
  const [employeeId, setEmployeeId] = useState('');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ssoProvider, setSsoProvider] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    setIsBiometricAvailable(window.innerWidth <= 768); // Simulated biometric for mobile
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
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
      case 'employee': return <UserCircle className="icon" />;
      case 'email': return <Mail className="icon" />;
      case 'sso': return <Building2 className="icon" />;
      case 'biometric': return <Fingerprint className="icon" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="container">
        <header className="header">
          <a href="/" className="back-link">
            <ChevronRight className="icon" />
            Back to Homepage
          </a>
        </header>

        <div className="login-box">
          <div className="login-header">
            <h1 className="title">WasteWatch</h1>
            <p className="subtitle">Smart Waste Management</p>
          </div>

          <div className="method-selector">
            {['employee', 'email', 'sso', ...(isBiometricAvailable ? ['biometric'] : [])].map((method) => (
              <button
                key={method}
                onClick={() => setLoginMethod(method)}
                className={`method-button ${loginMethod === method ? 'active' : ''}`}
              >
                {getLoginMethodIcon(method)}
                <span>{method === 'email' ? 'Email Login' : method.charAt(0).toUpperCase() + method.slice(1)}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="form">
            {loginMethod === 'employee' && (
              <>
                <div className="input-group">
                  <label htmlFor="employeeId" className="label">Employee ID</label>
                  <div className="input-wrapper">
                    <UserCircle className="input-icon" />
                    <input
                      type="text"
                      id="employeeId"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="e.g., EMP123"
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="pin" className="label">PIN</label>
                  <div className="input-wrapper">
                    <Key className="input-icon" />
                    <input
                      type="password"
                      id="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter 4-digit PIN"
                      className="input"
                      required
                    />
                  </div>
                </div>
                <p className="info">For technicians managing automated systems.</p>
              </>
            )}

            {loginMethod === 'email' && (
              <>
                <div className="input-group">
                  <label htmlFor="email" className="label">Email Address</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., admin@blinkit.com"
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="password" className="label">Password</label>
                  <div className="input-wrapper">
                    <Key className="input-icon" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="input"
                      required
                    />
                  </div>
                </div>
                <p className="info">For admins or dark store partners.</p>
              </>
            )}

            {loginMethod === 'sso' && (
              <div className="input-group">
                <label htmlFor="ssoProvider" className="label">SSO Provider</label>
                <div className="input-wrapper">
                  <Building2 className="input-icon" />
                  <select
                    id="ssoProvider"
                    value={ssoProvider}
                    onChange={(e) => setSsoProvider(e.target.value)}
                    className="select"
                    required
                  >
                    <option value="">Select Provider</option>
                    <option value="zomato">Zomato SSO</option>
                    <option value="blinkit">Blinkit SSO</option>
                  </select>
                </div>
                <p className="info">For enterprise clients like Blinkit.</p>
              </div>
            )}

            {loginMethod === 'biometric' && (
              <div className="biometric-section">
                <p className="info mb-4">Authenticate with biometrics</p>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-button"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="icon animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="icon" />
                      Scan Fingerprint/Face
                    </>
                  )}
                </button>
                <p className="info mt-4">For field staff using mobile devices.</p>
              </div>
            )}

            {error && <p className="error">{error}</p>}
            {loginMethod !== 'biometric' && (
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="icon animate-spin" />
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

          {loginMethod !== 'biometric' && (
            <div className="extra-options">
              <a href="#" className="forgot-link">
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