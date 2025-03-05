// src/pages/Landing.tsx
import React from 'react';
import { Factory, LeafyGreen, PackageCheck, Trophy, Building2, BarChart3, Truck, Recycle } from 'lucide-react';

// Stats data
const stats = [
  { icon: Factory, label: 'Partner Companies', value: '50+', color: 'bg-blue-500/10 text-blue-500' },
  { icon: LeafyGreen, label: 'Waste Reduction', value: '32%', color: 'bg-emerald-500/10 text-emerald-500' },
  { icon: PackageCheck, label: 'Waste Processed', value: '1.2M kg', color: 'bg-purple-500/10 text-purple-500' },
  { icon: Trophy, label: 'Sustainability Score', value: '94%', color: 'bg-amber-500/10 text-amber-500' },
];

// Partner data
const partners = [
  { name: 'Blinkit', location: 'Delhi NCR', wasteReduction: '45%', recyclableWaste: '75 tons' },
  { name: 'BigBasket', location: 'Bangalore', wasteReduction: '38%', recyclableWaste: '62 tons' },
  { name: 'Zepto', location: 'Mumbai', wasteReduction: '42%', recyclableWaste: '58 tons' },
];

// Main component
const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Revolutionizing Waste Management for
            <span className="text-emerald-500"> Dark Stores</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering businesses with smart automation and sustainable waste management solutions.
          </p>
          <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg">
            Get Started
          </button>
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
                <Recycle className="w-8 h-8 text-emerald-500" />
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
    </>
  );
};

export default LandingPage;