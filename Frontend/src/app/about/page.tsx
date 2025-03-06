"use client";
import React from "react";
import { motion } from "framer-motion";
import About from "./About";

const Page = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-h-screen"
      >
        <div className="pt-16 md:pt-24">
          <About />
        </div>
        
        {/* Additional Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-[#28af60] py-16 text-center"
        >
          <div className="container mx-auto px-4">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
              Join us in the fight against improper e-waste disposal
            </h3>
            <p className="text-[#28af60] text-lg max-w-3xl mx-auto mb-8">
              Every electronic device recycled properly is a step towards a cleaner, healthier environment for future generations.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#28af60] py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center mx-auto"
            >
              Learn More About Our Mission
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Page;
