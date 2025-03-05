import React, { useState } from 'react';
import {
  RecycleIcon, Fingerprint, Mail, Key, Building2, Loader2, 
  ChevronRight, BarChart3, Users, Factory, ArrowRight,
  LeafyGreen, PackageCheck, Truck, Trophy, ShieldCheck,
  UserCircle, Settings, Bell, ClipboardList
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

type LoginMethod = 'employee' | 'partner' | 'admin';
type View = 'landing' | 'login';
type EmployeeRole = 'technician' | 'logistics' | 'supervisor';

interface FormData {
  employeeId: string;
  email: string;
  password: string;
  pin: string;
  role?: EmployeeRole;
}

function App() {
  const [view, setView] = useState<View>('landing');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('employee');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    employeeId: '',
    email: '',
    password: '',
    pin: '',
    role: 'technician'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validation
      if (loginMethod === 'employee' && (!formData.employeeId || !formData.pin)) {
        throw new Error('Please fill in all required fields');
      }

      if (loginMethod === 'partner' && (!formData.email || !formData.password)) {
        throw new Error('Please fill in all required fields');
      }

      if (loginMethod === 'admin' && (!formData.email || !formData.password)) {
        throw new Error('Please fill in all required fields');
      }

      // Success notification with role-specific message
      const roleMessage = {
        employee: 'Welcome back, Waste Management Professional!',
        partner: 'Welcome to your Partner Dashboard!',
        admin: 'Welcome, Administrator!'
      }[loginMethod];

      toast.success(roleMessage);
      
      // Simulate redirect delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const getLoginMethodFeatures = (method: LoginMethod) => {
    switch (method) {
      case 'employee':
        return [
          'Access to IoT waste monitoring system',
          'Real-time task assignments',
          'Equipment maintenance logs',
          'Safety protocol documentation'
        ];
      case 'partner':
        return [
          'Waste analytics dashboard',
          'Sustainability reports',
          'Cost optimization insights',
          'Compliance tracking'
        ];
      case 'admin':
        return [
          'Complete system oversight',
          'User management',
          'Performance analytics',
          'Configuration controls'
        ];
      default:
        return [];
    }
  };

  const stats = [
    { icon: Factory, label: 'Partner Companies', value: '50+', color: 'bg-blue-500/10 text-blue-500' },
    { icon: LeafyGreen, label: 'Waste Reduction', value: '32%', color: 'bg-emerald-500/10 text-emerald-500' },
    { icon: PackageCheck, label: 'Waste Processed', value: '1.2M kg', color: 'bg-purple-500/10 text-purple-500' },
    { icon: Trophy, label: 'Sustainability Score', value: '94%', color: 'bg-amber-500/10 text-amber-500' }
  ];

  const partners = [
    { name: 'Blinkit', location: 'Delhi NCR', wasteReduction: '45%', recyclableWaste: '75 tons' },
    { name: 'BigBasket', location: 'Bangalore', wasteReduction: '38%', recyclableWaste: '62 tons' },
    { name: 'Zepto', location: 'Mumbai', wasteReduction: '42%', recyclableWaste: '58 tons' }
  ];

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        <Toaster position="top-right" />
        
        {/* Header */}
        <header className="p-4">
          <button 
            onClick={() => setView('landing')}
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
            Back to Homepage
          </button>
        </header>

        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Login Form Section */}
            <div className="w-full">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <RecycleIcon className="w-12 h-12 text-emerald-500" />
                  <h1 className="text-3xl font-bold">SafaiNova</h1>
                </div>
                <p className="text-gray-400">Smart Waste Management Platform</p>
              </div>

              <div className="bg-gray-800 rounded-xl shadow-xl p-8">
                {/* Login Method Selector */}
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
                            placeholder="Enter your Employee ID (e.g., WM-12345)"
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

                {/* Additional Options */}
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

            {/* Features Section */}
            <div className="hidden md:block">
              <div className="bg-gray-800 rounded-xl shadow-xl p-8 h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    {getLoginMethodIcon(loginMethod)}
                    <span className="capitalize">{loginMethod} Features</span>
                  </h2>
                  <p className="text-gray-400">
                    Access powerful tools designed specifically for your role
                  </p>
                </div>

                <div className="space-y-6">
                  {getLoginMethodFeatures(loginMethod).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-lg">
                        {index === 0 ? <Settings className="w-5 h-5" /> :
                         index === 1 ? <Bell className="w-5 h-5" /> :
                         index === 2 ? <BarChart3 className="w-5 h-5" /> :
                         <ClipboardList className="w-5 h-5" />}
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {loginMethod === 'employee' && (
                  <div className="mt-8 p-4 bg-emerald-500/10 rounded-lg">
                    <h3 className="text-emerald-500 font-semibold mb-2">Quick Access</h3>
                    <p className="text-sm text-gray-400">
                      Use your employee ID and PIN for faster login. Enable biometric authentication for instant secure access.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <RecycleIcon className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold">SafaiNova</span>
            </div>
            <button
              onClick={() => setView('login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Revolutionizing Waste Management for
            <span className="text-emerald-500"> Dark Stores</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering businesses with smart automation and sustainable waste management solutions.
            Join the future of responsible waste handling.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6">
              <div className={`inline-block p-3 rounded-lg ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold mb-8">Partner Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">{partner.name}</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{partner.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span>Waste Reduction: {partner.wasteReduction}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Recyclable Waste: {partner.recyclableWaste}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <RecycleIcon className="w-8 h-8 text-emerald-500" />
                <span className="text-xl font-bold">SafaiNova</span>
              </div>
              <p className="text-gray-400">
                Optimizing waste management for a sustainable future.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dark Store Management</li>
                <li>Waste Automation</li>
                <li>Sustainability Reports</li>
                <li>Partner Integration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;