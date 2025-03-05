// app/dashboard/page.jsx
"use client";
import React from "react";
import { FiBarChart2, FiUsers, FiSettings } from "react-icons/fi";

const Dashboard = () => {
  // Example admin stats (replace with real data from API)
  const adminStats = [
    { label: "Total Users", value: 120, icon: FiUsers },
    { label: "Active Sessions", value: 15, icon: FiBarChart2 },
    { label: "System Settings", value: "Manage", icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-emerald-600 mb-8">Admin Dashboard</h1>

      {/* Admin Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
          >
            <stat.icon className="text-4xl text-emerald-600" />
            <div>
              <p className="text-gray-600">{stat.label}</p>
              <h4 className="text-xl font-bold">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Data Visualization Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-emerald-600 mb-4">Data Visualization</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            Placeholder for charts or graphs. Use libraries like Chart.js or Recharts for dynamic visualizations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;