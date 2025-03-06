"use client"; // Keep this for App Router (Next.js 13+); remove if using Pages Router (Next.js 12 or earlier)
import React, { useState } from "react";
import Header from "../Header/"; // Adjusted path based on typical Next.js structure
import Image from "next/image";

// Sample data for Damaged and Expired Products (expanded with more items)
const damagedProducts = [
  {
    id: 1,
    name: "Damaged Plastic Containers",
    description: "Cracked plastic containers unsuitable for reuse, collected from manufacturing defects.",
    image: "/images/damaged-plastic.jpg", // Replace with actual image path
    quantity: "75 units",
    status: "Awaiting Disposal",
    location: "Mumbai, India",
    dateReported: "2024-03-01",
  },
  {
    id: 2,
    name: "Broken Glass Bottles",
    description: "Shattered glass bottles from production errors, posing safety risks.",
    image: "/images/broken-glass.jpg",
    quantity: "45 units",
    status: "Scheduled for Recycling",
    location: "New York, USA",
    dateReported: "2024-02-28",
  },
  {
    id: 3,
    name: "Faulty Electronics",
    description: "Damaged circuit boards and screens from old devices, requiring e-waste recycling.",
    image: "/images/faulty-electronics.jpg",
    quantity: "35 units",
    status: "Pending Assessment",
    location: "London, UK",
    dateReported: "2024-03-03",
  },
  {
    id: 4,
    name: "Torn Packaging Materials",
    description: "Ripped cardboard and plastic wraps from shipping damage.",
    image: "/images/torn-packaging.jpg",
    quantity: "60 units",
    status: "In Transit for Disposal",
    location: "Tokyo, Japan",
    dateReported: "2024-03-02",
  },
  {
    id: 5,
    name: "Defective Metal Cans",
    description: "Rusted or dented metal cans unfit for use, collected from warehouses.",
    image: "/images/defective-metal.jpg",
    quantity: "40 units",
    status: "Ready for Scraping",
    location: "Sydney, Australia",
    dateReported: "2024-03-04",
  },
];

const expiredProducts = [
  {
    id: 1,
    name: "Expired Food Packages",
    description: "Outdated food packaging from inventory, unsuitable for consumption.",
    image: "/images/expired-food.jpg", // Replace with actual image path
    expiryDate: "2023-12-15",
    status: "Ready for Composting",
    location: "Delhi, India",
    quantity: "100 kg",
  },
  {
    id: 2,
    name: "Old Cleaning Supplies",
    description: "Expired cleaning agents past their shelf life, hazardous if used.",
    image: "/images/expired-cleaning.jpg",
    expiryDate: "2023-11-10",
    status: "Scheduled for Disposal",
    location: "Los Angeles, USA",
    quantity: "50 liters",
  },
  {
    id: 3,
    name: "Unused Medical Kits",
    description: "Expired medical supplies from clinics, requiring safe disposal.",
    image: "/images/expired-medical.jpg",
    expiryDate: "2023-10-01",
    status: "Awaiting Pickup",
    location: "Paris, France",
    quantity: "25 kits",
  },
  {
    id: 4,
    name: "Outdated Pesticides",
    description: "Expired agricultural chemicals, needing hazardous waste management.",
    image: "/images/expired-pesticides.jpg",
    expiryDate: "2023-09-20",
    status: "In Processing",
    location: "Berlin, Germany",
    quantity: "30 gallons",
  },
  {
    id: 5,
    name: "Expired Cosmetics",
    description: "Outdated skincare and makeup products, unfit for sale.",
    image: "/images/expired-cosmetics.jpg",
    expiryDate: "2023-12-05",
    status: "Ready for Recycling",
    location: "Toronto, Canada",
    quantity: "80 units",
  },
];

const WasteProductsPage = () => {
  const [activeSection, setActiveSection] = useState("damaged"); // Default to Damaged Products

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-emerald-400 mb-12 text-center animate-fadeIn">
          SafaiNova Waste Management Automation
        </h1>
        <p className="text-gray-300 mb-12 text-center max-w-4xl mx-auto text-lg leading-relaxed animate-slideUp">
          Discover our cutting-edge waste management solutions for damaged and expired products, designed to optimize recycling, disposal, and sustainability for a cleaner future with SafaiNova.
        </p>

        {/* Tabs for Damaged and Expired Products */}
        <div className="flex justify-center mb-12 space-x-6">
          <button
            onClick={() => setActiveSection("damaged")}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeSection === "damaged"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md"
            }`}
          >
            Damaged Products
          </button>
          <button
            onClick={() => setActiveSection("expired")}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeSection === "expired"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md"
            }`}
          >
            Expired Products
          </button>
        </div>

        {/* Damaged Products Section */}
        {activeSection === "damaged" && (
          <section className="mb-16 animate-slideInLeft">
            <h2 className="text-3xl font-semibold text-emerald-400 mb-8">
              Damaged Products
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Efficiently manage and track damaged items requiring specialized handling, recycling, or disposal with SafaiNova’s automation tools.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {damagedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-6 hover:shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover rounded-t-xl"
                    priority
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-100 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-400">Quantity: {product.quantity}</p>
                      <p className="text-gray-400">Location: {product.location}</p>
                      <p className="text-gray-400">Reported: {product.dateReported}</p>
                      <p className="text-emerald-400 font-medium">Status: {product.status}</p>
                    </div>
                    <button className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                      Manage Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Expired Products Section */}
        {activeSection === "expired" && (
          <section className="animate-slideInRight">
            <h2 className="text-3xl font-semibold text-emerald-400 mb-8">
              Expired Products
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Safely handle and automate the disposal or recycling of expired products with our advanced waste management platform.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {expiredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-6 hover:shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover rounded-t-xl"
                    priority
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-100 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-400">Expiry Date: {product.expiryDate}</p>
                      <p className="text-gray-400">Location: {product.location}</p>
                      <p className="text-gray-400">Quantity: {product.quantity}</p>
                      <p className="text-emerald-400 font-medium">Status: {product.status}</p>
                    </div>
                    <button className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                      Manage Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-2xl mx-auto">
            Transform your waste management with SafaiNova’s innovative automation solutions. Join us today to reduce environmental impact and enhance efficiency.
          </p>
          <Link
            href="/register"
            className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Join SafaiNova Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default WasteProductsPage;