"use client"; // Keep this for App Router (Next.js 13+); remove if using Pages Router (Next.js 12 or earlier)
import React, { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaRecycle } from "react-icons/fa";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import Header from "../Header/Navbar"; // Adjusted path based on typical Next.js structure
import Link from "next/link"; // Added for the call-to-action link

// Sample data for Damaged and Expired Products (7 items each)
const damagedProducts = [
  {
    id: 1,
    name: "Damaged Plastic Containers",
    description: "Cracked plastic containers from manufacturing defects, unfit for reuse.",
    quantity: "75 units",
    status: "Awaiting Disposal",
    location: "Mumbai, India",
    dateReported: "2024-03-01",
  },
  {
    id: 2,
    name: "Broken Glass Bottles",
    description: "Shattered glass bottles from production errors, posing safety risks.",
    quantity: "45 units",
    status: "Scheduled for Recycling",
    location: "New York, USA",
    dateReported: "2024-02-28",
  },
  {
    id: 3,
    name: "Faulty Electronics",
    description: "Damaged circuit boards and screens from old devices, needing e-waste recycling.",
    quantity: "35 units",
    status: "Pending Assessment",
    location: "London, UK",
    dateReported: "2024-03-03",
  },
  {
    id: 4,
    name: "Torn Packaging Materials",
    description: "Ripped cardboard and plastic wraps from shipping damage, non-reusable.",
    quantity: "60 units",
    status: "In Transit for Disposal",
    location: "Tokyo, Japan",
    dateReported: "2024-03-02",
  },
  {
    id: 5,
    name: "Defective Metal Cans",
    description: "Rusted or dented metal cans unfit for use, collected from warehouses.",
    quantity: "40 units",
    status: "Ready for Scraping",
    location: "Sydney, Australia",
    dateReported: "2024-03-04",
  },
  {
    id: 6,
    name: "Cracked Wooden Pallets",
    description: "Split wooden pallets damaged during transport, requiring disposal.",
    quantity: "50 units",
    status: "Awaiting Pickup",
    location: "Berlin, Germany",
    dateReported: "2024-03-05",
  },
  {
    id: 7,
    name: "Damaged Textile Waste",
    description: "Torn fabrics and clothing from production errors, needing recycling.",
    quantity: "80 units",
    status: "Scheduled for Processing",
    location: "Paris, France",
    dateReported: "2024-03-06",
  },
];

const expiredProducts = [
  {
    id: 1,
    name: "Expired Food Packages",
    description: "Outdated food packaging from inventory, unsuitable for consumption.",
    expiryDate: "2023-12-15",
    status: "Ready for Composting",
    location: "Delhi, India",
    quantity: "100 kg",
  },
  {
    id: 2,
    name: "Old Cleaning Supplies",
    description: "Expired cleaning agents past their shelf life, hazardous if used.",
    expiryDate: "2023-11-10",
    status: "Scheduled for Disposal",
    location: "Los Angeles, USA",
    quantity: "50 liters",
  },
  {
    id: 3,
    name: "Unused Medical Kits",
    description: "Expired medical supplies from clinics, requiring safe disposal.",
    expiryDate: "2023-10-01",
    status: "Awaiting Pickup",
    location: "Paris, France",
    quantity: "25 kits",
  },
  {
    id: 4,
    name: "Outdated Pesticides",
    description: "Expired agricultural chemicals, needing hazardous waste management.",
    expiryDate: "2023-09-20",
    status: "In Processing",
    location: "Berlin, Germany",
    quantity: "30 gallons",
  },
  {
    id: 5,
    name: "Expired Cosmetics",
    description: "Outdated skincare and makeup products, unfit for sale.",
    expiryDate: "2023-12-05",
    status: "Ready for Recycling",
    location: "Toronto, Canada",
    quantity: "80 units",
  },
  {
    id: 6,
    name: "Old Paint Cans",
    description: "Expired paint products beyond their usable date, requiring disposal.",
    expiryDate: "2023-08-15",
    status: "Pending Disposal",
    location: "Sydney, Australia",
    quantity: "45 cans",
  },
  {
    id: 7,
    name: "Expired Batteries",
    description: "Outdated batteries from industrial use, needing specialized recycling.",
    expiryDate: "2023-11-25",
    status: "Scheduled for E-Waste Recycling",
    location: "Tokyo, Japan",
    quantity: "60 units",
  },
];

// Reusable Product Card Component
const ProductCard = ({ product, onManage }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 duration-200">
      <div className="flex justify-center items-center mb-4">
        {product.status.includes("Recycling") ? (
          <FaRecycle className="text-emerald-600 text-4xl" />
        ) : (
          <FaTrashAlt className="text-red-500 text-4xl" />
        )}
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-3">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-gray-700 text-sm mb-2">
        <strong>Quantity:</strong> {product.quantity}
      </p>
      <p className="text-gray-700 text-sm mb-2 flex items-center gap-2">
        <MdLocationOn className="text-blue-500" /> {product.location}
      </p>
      <p className="text-gray-700 text-sm mb-3 flex items-center gap-2">
        <MdDateRange className="text-yellow-500" />{" "}
        {product.dateReported || product.expiryDate}
      </p>
      <p className="text-emerald-600 text-sm font-medium text-center mb-3">
        <strong>Status:</strong> {product.status}
      </p>
      <button
        onClick={() => onManage(product)}
        className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
      >
        Manage Item
      </button>
    </div>
  );
};

// Popup Component (Modal for Waste Management Info)
const WasteManagementPopup = ({ isOpen, onClose, product }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside or pressing Esc
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300"
      >
        <h2 className="text-xl font-bold text-emerald-600 mb-4">
          Managing {product.name}
        </h2>
        <p className="text-gray-700 mb-2">
          Your waste management is with automation using SafaiNova’s advanced system.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {product.location}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Status:</strong> {product.status}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Action required:</strong> Update or schedule disposal/recycling.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded font-medium hover:bg-emerald-700 transition-all duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const WasteProductsPage = () => {
  const [activeSection, setActiveSection] = useState("damaged"); // Default to Damaged Products
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Open popup when managing an item
  const handleManage = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  // Animation effect using useEffect for a smooth entrance (no external libraries)
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".animate-slideIn");
      elements.forEach((el, index) => {
        el.classList.add("opacity-100", "translate-y-0");
        el.classList.remove("opacity-0", "translate-y-20");
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-emerald-700 mb-6 animate-slideIn">
            SafaiNova Waste Management Automation
          </h1>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed animate-slideIn">
            Discover our state-of-the-art waste management solutions for damaged and expired products, designed to optimize recycling, disposal, and sustainability for a cleaner future with SafaiNova.
          </p>
        </div>

        {/* Tabs for Damaged and Expired Products */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveSection("damaged")}
            className={`px-6 py-3 flex items-center gap-2 rounded-lg font-semibold transition ${
              activeSection === "damaged"
                ? "bg-emerald-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-400"
            }`}
          >
            <FaTrashAlt className="text-lg" /> Damaged Products
          </button>
          <button
            onClick={() => setActiveSection("expired")}
            className={`px-6 py-3 flex items-center gap-2 rounded-lg font-semibold transition ${
              activeSection === "expired"
                ? "bg-emerald-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-400"
            }`}
          >
            <FaRecycle className="text-lg" /> Expired Products
          </button>
        </div>

        {/* Damaged Products Section */}
        {activeSection === "damaged" && (
          <section className="mb-20 animate-slideIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold text-emerald-700 mb-4">
                Damaged Products
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Efficiently manage and track damaged items requiring specialized handling, recycling, or disposal with SafaiNova’s advanced automation tools.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <h2 className="text-3xl font-semibold text-emerald-700 mb-4">
                Expired Products
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Safely handle and automate the disposal or recycling of expired products with our state-of-the-art waste management platform.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {expiredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onManage={handleManage} />
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
            Transform your waste management with SafaiNova’s innovative automation solutions. Join us today to reduce environmental impact and enhance efficiency.
          </p>
          <Link
            href="/register"
            className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Join SafaiNova Now
          </Link>
        </div>
      </main>

      {/* Waste Management Popup */}
      <WasteManagementPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        product={selectedProduct}
      />

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
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default WasteProductsPage;