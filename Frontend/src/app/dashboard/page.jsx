    // app/dashboard/page.jsx
    "use client";
    import React from "react";
    import { FiBarChart2, FiUsers, FiSettings } from "react-icons/fi";
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
    } from "recharts";
    import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
    import "leaflet/dist/leaflet.css";

    const Dashboard = () => {
    // Sample Data for Charts
    const userData = [
        { name: "Jan", Users: 4000 },
        { name: "Feb", Users: 3000 },
        { name: "Mar", Users: 2000 },
        { name: "Apr", Users: 2780 },
        { name: "May", Users: 1890 },
        { name: "Jun", Users: 2390 },
    ];

    const pieData = [
        { name: "Active Users", value: 400 },
        { name: "Inactive Users", value: 100 },
    ];

    const COLORS = ["#34D399", "#F87171"];

    // Sample Data for Table
    const tableData = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Editor" },
    ];

    return (
        <div
        className="min-h-screen bg-gray-50 pt-20 p-8" // Added pt-20 for padding-top
        >
        {/* Header */}
        <h1 className="text-3xl font-bold text-emerald-600 mb-8  mt-32">Admin Dashboard</h1>

        {/* Admin Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Total Users" value={120} icon={FiUsers} />
            <StatCard label="Active Sessions" value={15} icon={FiBarChart2} />
            <StatCard label="System Settings" value="Manage" icon={FiSettings} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-emerald-600 mb-4">Monthly User Growth</h2>
            <BarChart width={500} height={300} data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#34D399" />
            </BarChart>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-emerald-600 mb-4">User Activity</h2>
            <PieChart width={400} height={300}>
                <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                }
                >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-emerald-600 mb-4">User Locations</h2>
            <MapContainer
            center={[20.5937, 78.9629]} // Centered on India
            zoom={5}
            style={{ height: "400px", width: "100%" }}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[28.7041, 77.1025]}> {/* Delhi */}
                <Popup>Delhi Office</Popup>
            </Marker>
            <Marker position={[19.076, 72.8777]}> {/* Mumbai */}
                <Popup>Mumbai Branch</Popup>
            </Marker>
            </MapContainer>
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-emerald-600 mb-4">User List</h2>
            <table className="w-full text-left">
            <thead className="border-b border-gray-200">
                <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                    <td className="p-2">{user.id}</td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    };

    // Stat Card Component
    const StatCard = ({ label, value, icon: Icon }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <Icon className="text-4xl text-emerald-600" />
        <div>
            <p className="text-gray-600">{label}</p>
            <h4 className="text-xl font-bold">{value}</h4>
        </div>
        </div>
    );
    };

    export default Dashboard;   