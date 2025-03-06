// app/dashboard/page.jsx
"use client";
import React from "react";
import { FiBarChart2, FiUsers, FiSettings, FiTrash2, FiMapPin, FiTruck } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  // Waste Collection Data
  const wasteCollectionData = [
    { name: "Jan", "Recyclable Waste": 1500, "Non-Recyclable Waste": 900 },
    { name: "Feb", "Recyclable Waste": 1800, "Non-Recyclable Waste": 850 },
    { name: "Mar", "Recyclable Waste": 2000, "Non-Recyclable Waste": 950 },
    { name: "Apr", "Recyclable Waste": 2400, "Non-Recyclable Waste": 880 },
    { name: "May", "Recyclable Waste": 2100, "Non-Recyclable Waste": 800 },
    { name: "Jun", "Recyclable Waste": 2500, "Non-Recyclable Waste": 750 },
  ];

  // Waste Categories Breakdown
  const wasteCategories = [
    { name: "Plastic", value: 1200 },
    { name: "Paper", value: 800 },
    { name: "Glass", value: 600 },
    { name: "Metal", value: 400 },
    { name: "Organic", value: 1500 },
  ];

  // Collection Efficiency Over Time
  const efficiencyData = [
    { name: "Jan 01", efficiency: 65 },
    { name: "Jan 02", efficiency: 72 },
    { name: "Jan 03", efficiency: 68 },
    { name: "Jan 04", efficiency: 82 },
    { name: "Jan 05", efficiency: 85 },
    { name: "Jan 06", efficiency: 78 },
  ];

  // Device Usage for Waste Management App
  const deviceUsageData = [
    { name: "iOS", value: 35 },
    { name: "Android", value: 45 },
    { name: "Web", value: 20 },
  ];

  // Collection Truck Locations
  const truckLocations = [
    { id: 1, position: [28.7041, 77.1025], name: "Truck 001", status: "Collecting" },
    { id: 2, position: [19.076, 72.8777], name: "Truck 002", status: "En Route" },
    { id: 3, position: [12.9716, 77.5946], name: "Truck 003", status: "At Facility" },
  ];

  // Team Members
  const teamData = [
    { id: 1, name: "John Doe", email: "john@wastevision.com", role: "Collection Manager", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@wastevision.com", role: "Sorting Specialist", status: "Active" },
    { id: 3, name: "Sam Wilson", email: "sam@wastevision.com", role: "AI Technician", status: "On Leave" },
    { id: 4, name: "Maria Garcia", email: "maria@wastevision.com", role: "Route Optimizer", status: "Active" },
  ];

  // Colors for charts
  const CATEGORY_COLORS = ["#10B981", "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6"];
  const DEVICE_COLORS = ["#10B981", "#6366F1", "#F59E0B"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-20 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 mt-8">
        <h1 className="text-3xl font-bold text-emerald-400">Waste Vision Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-400">Last Updated</span>
            <p className="font-medium">Today, 10:30 AM</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Total Waste Collected" 
          value="2,500 tons" 
          change="+24%" 
          icon={FiTrash2} 
        />
        <StatCard 
          label="Collection Points" 
          value="2,315" 
          change="+34%" 
          icon={FiMapPin} 
        />
        <StatCard 
          label="Active Trucks" 
          value="15/20" 
          change="-5%" 
          icon={FiTruck} 
        />
        <StatCard 
          label="System Efficiency" 
          value="87.5%" 
          change="+12%" 
          icon={FiBarChart2} 
        />
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - 8 Units Wide */}
        <div className="lg:col-span-8 space-y-6">
          {/* Waste Collection Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">Monthly Waste Collection</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={wasteCollectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }} />
                <Legend />
                <Bar dataKey="Recyclable Waste" fill="#10B981" />
                <Bar dataKey="Non-Recyclable Waste" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Map Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">Collection Fleet Tracker</h2>
            <div className="h-96 w-full rounded-lg overflow-hidden">
              <MapContainer
                center={[20.5937, 78.9629]} // Centered on India
                zoom={5}
                style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {truckLocations.map((truck) => (
                  <Marker key={truck.id} position={truck.position}>
                    <Popup>
                      <div className="p-1">
                        <p className="font-bold">{truck.name}</p>
                        <p>Status: {truck.status}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
          
          {/* Collection Efficiency Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">Collection Efficiency Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={efficiencyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }} />
                <Area type="monotone" dataKey="efficiency" stroke="#10B981" fillOpacity={1} fill="url(#colorEfficiency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - 4 Units Wide */}
        <div className="lg:col-span-4 space-y-6">
          {/* Waste Categories Pie Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">Waste Categories</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Device Usage Donut Chart */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">App Usage by Platform</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#F9FAFB" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Team Table */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">Team Members</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="p-2 text-gray-400">Name</th>
                    <th className="p-2 text-gray-400">Role</th>
                    <th className="p-2 text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="p-2 font-medium">{user.name}</td>
                      <td className="p-2 text-gray-300">{user.role}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active" ? "bg-emerald-900 text-emerald-300" : "bg-amber-900 text-amber-300"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Tasks */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-emerald-400 mb-4">Quick Tasks</h2>
            <div className="space-y-2">
              <TaskItem label="Schedule waste collection" />
              <TaskItem label="Check AI classification accuracy" />
              <TaskItem label="Update route optimization" />
              <TaskItem label="Review staff assignments" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component with change indicator
const StatCard = ({ label, value, change, icon: Icon }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
          <span className={`text-sm mt-2 inline-block ${
            isPositive ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {change} from last week
          </span>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <Icon className="text-xl text-emerald-400" />
        </div>
      </div>
    </div>
  );
};

// Task Item Component
const TaskItem = ({ label }) => {
  return (
    <div className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors">
      <input type="checkbox" className="mr-3 h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" />
      <span>{label}</span>
    </div>
  );
};

export default Dashboard;