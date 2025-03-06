"use client"; // Keep this for App Router (Next.js 13+); remove if using Pages Router (Next.js 12 or earlier)
import React, { useState, useEffect } from "react";
import Header from "../Header/Navbar"; // Adjusted path based on typical Next.jsimport Image from "next/image";

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

// Reusable Product Card Component
const ProductCard = ({ product, onManage }) => {
  return (
    <div
      className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-6 hover:shadow-2xl hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
    >
      {/* <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={250}
        className="w-full h-56 object-cover rounded-t-xl transition-opacity duration-300 group-hover:opacity-90"
        priority
      /> */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-100 mb-3 group-hover:text-emerald-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
          {product.description}
        </p>
        <div className="space-y-2 text-sm">
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {product.quantity ? `Quantity: ${product.quantity}` : `Expiry Date: ${product.expiryDate}`}
          </p>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            Location: {product.location}
          </p>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {product.dateReported ? `Reported: ${product.dateReported}` : `Expired: ${product.expiryDate}`}
          </p>
          <p className="text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors duration-300">
            Status: {product.status}
          </p>
        </div>
        <button
          onClick={() => onManage(product)}
          className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Manage Item
        </button>
      </div>
    </div>
  );
};

const WasteProductsPage = () => {
  const [activeSection, setActiveSection] = useState("damaged"); // Default to Damaged Products
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Simulate a modal or alert for managing an item (no external dependencies)
  const handleManage = (product) => {
    setSelectedProduct(product);
    alert(`Managing ${product.name}\nLocation: ${product.location}\nStatus: ${product.status}\nAction required: Update or schedule disposal/recycling.`);
    setSelectedProduct(null); // Reset after showing alert
  };

  // Animation effect using useEffect for a smooth entrance (no external libraries)
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-slideIn');
      elements.forEach((el, index) => {
        el.classList.add('opacity-100', 'translate-y-0');
        el.classList.remove('opacity-0', 'translate-y-20');
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden">
      <Header />
      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-400 mb-6 animate-slideIn">
            SafaiNova Waste Management Automation
          </h1>
          <p className="text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed animate-slideIn">
            Discover our cutting-edge waste management solutions for damaged and expired products, designed to optimize recycling, disposal, and sustainability for a cleaner future with SafaiNova.
          </p>
        </div>

        {/* Tabs for Damaged and Expired Products */}
        <div className="flex justify-center mb-12 space-x-8">
          <button
            onClick={() => setActiveSection("damaged")}
            className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
              activeSection === "damaged"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md"
            }`}
          >
            Damaged Products
          </button>
          <button
            onClick={() => setActiveSection("expired")}
            className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
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
          <section className="mb-20 animate-slideIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold text-emerald-400 mb-4">
                Damaged Products
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                Efficiently manage and track damaged items requiring specialized handling, recycling, or disposal with SafaiNova’s advanced automation tools.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {damagedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onManage={handleManage} />
              ))}
            </div>
          </section>
        )}

        {/* Expired Products Section */}
        {activeSection === "expired" && (
          <section className="animate-slideIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold text-emerald-400 mb-4">
                Expired Products
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                Safely handle and automate the disposal or recycling of expired products with our state-of-the-art waste management platform.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {expiredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onManage={handleManage} />
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Transform your waste management with SafaiNova’s innovative automation solutions. Join us today to reduce environmental impact and enhance efficiency.
          </p>
          {/* <Link href="/register"
            className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
          Join SafaiNova Now
          </Link> */}
        </div>
      </main>

      {/* Custom CSS for Animations (Inline or in globals.css) */}
      <style jsx>{`
        .animate-slideIn {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .opacity-100 {
          opacity: 1;
        }
        .translate-y-0 {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default WasteProductsPage;