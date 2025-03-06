import Image from "next/image";
import Link from "next/link";
import React from "react";
import feature from "../../assets/features/banner.svg";

const About = () => {
  return (
    <section className="mt-20 section features py-20 min-h-screen flex items-center" id="features" aria-label="features">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-16">
          <p className="section-subtitle font-bold text-[#28af60] mb-3 tracking-wider uppercase">
            About SafaiNOVA
          </p>

          <h2 className="text-4xl md:text-5xl section-title font-bold text-gray-900 mb-6 leading-tight">
            Revolutionizing E-Waste Locator and Management
          </h2>
          
          <div className="w-24 h-1 bg-[#28af60] mx-auto mb-8"></div>
        </div>

        <div className="mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-16 items-center justify-between text-center md:text-left">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pl-8 order-2 md:order-1">
              <p className="section-text text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-8">
                In India, the improper disposal of e-waste contributes to the
                alarming annual collection of <span className="text-[#28af60] font-semibold">1.71 million metric tons</span>. 
                Locating trustworthy e-waste collection facilities remains a significant
                challenge, intensifying this environmental issue.
              </p>
              
              <p className="section-text text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-10">
                The ELocate Web Platform is conceived to directly address this
                issue. Our platform offers a dynamic, user-friendly interface for
                individuals and businesses seeking reliable e-waste collection
                facilities.
              </p>
              
              <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-4 mt-8">
                <Link href="/contactus" className="inline-block">
                  <button className="btn bg-[#28af60] hover:bg-[#219f50] text-white py-3 px-8 rounded-full font-semibold transition-colors duration-300 text-lg shadow-lg">
                    Contact Us
                  </button>
                </Link>
                <Link href="/recycle" className="inline-block">
                  <button className="btn bg-white hover:bg-gray-100 text-[#28af60] border-2 border-[#28af60] py-3 px-8 rounded-full font-semibold transition-colors duration-300 text-lg shadow-md">
                    Recycling Services
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center order-1 md:order-2">
              <div className="relative">
                <div className="relative z-10 overflow-hidden rounded-full mb-8 shadow-2xl z-0">
                  <Image
                    src={feature}
                    alt="E-Waste Management"
                    width={500}
                    height={500}
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Content Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#4bcf82] opacity-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Efficient Collection</h3>
              <p className="text-gray-600">Our platform connects you with nearby e-waste collection centers to ensure proper disposal and recycling of electronic waste.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#4bcf82] opacity-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#28af60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Responsible Recycling</h3>
              <p className="text-gray-600">We ensure that all e-waste is processed by certified facilities that adhere to environmental standards and regulations.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#4bcf82] opacity-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#28af60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact</h3>
              <p className="text-gray-600">By using our platform, you contribute to reducing the environmental footprint caused by improper e-waste disposal.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
