// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { 
  BarChart3, Users, Factory, LeafyGreen, PackageCheck, Truck,
  UserCircle, Settings, Bell, ClipboardList, LogOut, ChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Define the user role type
type UserRole = 'employee' | 'partner' | 'admin';

// Props interface (optional, if you pass userRole as a prop)
interface DashboardProps {
  userRole?: UserRole; // Optional prop for demonstration
}

const Dashboard: React.FC<DashboardProps> = ({ userRole: propUserRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // For demo purposes, use prop or default to 'employee'. 
  // In a real app, this should come from auth context or state management
  const userRole: UserRole = propUserRole || 'employee'; // Replace with actual auth logic

  const sidebarItems: Record<UserRole, { icon: any; label: string; path: string }[]> = {
    employee: [
      { icon: ClipboardList, label: 'Tasks', path: '/dashboard/tasks' },
      { icon: Truck, label: 'Logistics', path: '/dashboard/logistics' },
      { icon: BarChart3, label: 'Performance', path: '/dashboard/performance' },
      { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ],
    partner: [
      { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
      { icon: Factory, label: 'Facilities', path: '/dashboard/facilities' },
      { icon: LeafyGreen, label: 'Sustainability', path: '/dashboard/sustainability' },
      { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ],
    admin: [
      { icon: Users, label: 'Users', path: '/dashboard/users' },
      { icon: BarChart3, label: 'System Analytics', path: '/dashboard/analytics' },
      { icon: ClipboardList, label: 'Reports', path: '/dashboard/reports' },
      { icon: Settings, label: 'System Settings', path: '/dashboard/settings' },
    ],
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth token)
    navigate('/login');
  };

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-emerald-500" />
              <span className="text-lg font-semibold capitalize">{userRole} Dashboard</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-emerald-400"
          >
            <ChevronLeft className={`w-6 h-6 transition-transform ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>

        <nav className="mt-6">
          {sidebarItems[userRole].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-emerald-400 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Bell className="w-8 h-8 text-emerald-500" />
            Welcome to Your Dashboard
          </h1>

          {/* Role-specific content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRole === 'employee' && (
              <>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Today’s Tasks</h2>
                  <p className="text-gray-400">5 waste collection tasks pending</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Equipment Status</h2>
                  <p className="text-gray-400">All systems operational</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Safety Alerts</h2>
                  <p className="text-gray-400">No active alerts</p>
                </div>
              </>
            )}

            {userRole === 'partner' && (
              <>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Waste Analytics</h2>
                  <p className="text-gray-400">32% reduction this month</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Facility Status</h2>
                  <p className="text-gray-400">3 active facilities</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Compliance</h2>
                  <p className="text-gray-400">100% compliant</p>
                </div>
              </>
            )}

            {userRole === 'admin' && (
              <>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Active Users</h2>
                  <p className="text-gray-400">45 employees online</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">System Health</h2>
                  <p className="text-gray-400">All services running</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Pending Reports</h2>
                  <p className="text-gray-400">3 reports to review</p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;