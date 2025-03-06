"use client";
import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  paperPlane,
  location,
  call,
  mail,
  logoLinkedin,
  logoTwitter,
  logoInstagram,
  logoWhatsapp,
} from "ionicons/icons";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Bugbb2.png";

/**
 * Footer configuration data
 * Centralizes all content for easier maintenance and updates
 */
const FOOTER_CONFIG = {
  branding: {
    logo: logo,
    altText: "SafaiNOVA",
    newsletterText: "Stay updated with our latest innovations in waste management automation."
  },
  company: {
    title: "Company",
    links: [
      { href: "/aboutus", text: "About Us" },
      { href: "/solutions", text: "Our Solutions" },
      { href: "/darkstores", text: "Dark Store Automation" },
      { href: "/case-studies", text: "Case Studies" },
      { href: "/contactus", text: "Contact Us" },
      { href: "/blogs", text: "Our Blog" },
    ],
  },
  contact: {
    title: "Contact Us",
    items: [
      { icon: location, text: "Your Address Here", ariaLabel: "Office location" },
      { icon: call, text: "+123 456 7890", ariaLabel: "Phone number" },
      { icon: mail, text: "info@SafaiNOVA.com", ariaLabel: "Email address" },
    ]
  },
  social: {
    title: "Connect With Us",
    platforms: [
      { icon: logoLinkedin, href: "#", label: "LinkedIn" },
      { icon: logoTwitter, href: "#", label: "Twitter" },
      { icon: logoInstagram, href: "#", label: "Instagram" },
      { icon: logoWhatsapp, href: "#", label: "WhatsApp" },
    ]
  },
  legal: {
    copyright: "SafaiNOVA",
    links: [
      { href: "/privacypolicy", text: "Privacy Policy" },
      { href: "/termsandservices", text: "Terms of Use" },
      { href: "/sitemap", text: "Sitemap" },
    ],
  },
};

/**
 * Newsletter subscription form component
 */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        { email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setEmail("");
        toast.success("Thank you for subscribing!");
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Newsletter submission error:", error);
        toast.error("Subscription failed. Please try again.");
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter-form mt-6">
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          aria-label="Subscribe to newsletter"
          disabled={isSubmitting}
        >
          <IonIcon icon={paperPlane} aria-hidden="true" className="text-lg" />
        </button>
      </div>
    </form>
  );
};

/**
 * Social media links component
 */
const SocialLinks = ({ title, platforms }) => (
  <div className="mt-6">
    <h4 className="text-md font-medium text-gray-700 mb-3">{title}</h4>
    <div className="flex gap-4">
      {platforms.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          className="bg-gray-100 text-gray-600 hover:text-blue-600 hover:bg-gray-200 transition-colors p-2 rounded-full"
          aria-label={social.label}
        >
          <IonIcon icon={social.icon} className="text-xl" />
        </Link>
      ))}
    </div>
  </div>
);

/**
 * Company links section component
 */
const FooterLinks = ({ title, links }) => (
  <div className="footer-links">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <nav aria-label={`${title} navigation`}>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-gray-600 hover:text-blue-600 transition-colors inline-block"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

/**
 * Contact information component
 */
const ContactInfo = ({ title, items }) => (
  <div className="footer-contact">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-full">
            <IonIcon icon={item.icon} className="text-blue-600 text-xl" aria-label={item.ariaLabel} />
          </div>
          <span className="text-gray-600">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Main Footer Component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Newsletter Section */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-4" aria-label="Go to homepage">
              <Image
                src={FOOTER_CONFIG.branding.logo}
                alt={FOOTER_CONFIG.branding.altText}
                width={120}
                height={60}
                className="h-auto"
                priority
              />
            </Link>
            <p className="text-gray-600 mb-4">
              {FOOTER_CONFIG.branding.newsletterText}
            </p>
            <NewsletterForm />
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <FooterLinks 
              title={FOOTER_CONFIG.company.title} 
              links={FOOTER_CONFIG.company.links} 
            />
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <ContactInfo 
              title={FOOTER_CONFIG.contact.title}
              items={FOOTER_CONFIG.contact.items}
            />
          </div>
          
          {/* About SafaiNOVA with Problem Statement Description */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About SafaiNOVA</h3>
            
            <p className="text-gray-600 mb-4">
              Our technology uses computer vision and robotics to automate the entire waste management workflow, from collection to sorting and disposal, helping dark stores operate more efficiently while reducing their environmental footprint.
            </p>
            <SocialLinks 
              title={FOOTER_CONFIG.social.title}
              platforms={FOOTER_CONFIG.social.platforms}
            />
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} {FOOTER_CONFIG.legal.copyright} | All Rights Reserved
          </p>
          
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {FOOTER_CONFIG.legal.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;