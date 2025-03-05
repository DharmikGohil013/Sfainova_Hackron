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
import logo from "../../assets/Bugbb2.png";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configuration for dynamic content
const footerConfig = {
  company: {
    title: "Company",
    links: [
      { href: "/aboutus", text: "About us" },
      { href: "/education", text: "Education" },
      { href: "/facilities", text: "Ai-Base Facilities" },
      { href: "/news", text: "Latest News" },
      { href: "/contactus", text: "Contact Us" },
      { href: "/blogs", text: "Our Blog" },
    ],
  },
  legal: {
    links: [
      { href: "/privacypolicy", text: "Privacy Policy" },
      { href: "/termsandservices", text: "Terms of Use" },
    ],
  },
  social: [
    { icon: logoLinkedin, href: "#" },
    { icon: logoTwitter, href: "#" },
    { icon: logoInstagram, href: "#" },
    { icon: logoWhatsapp, href: "#" },
  ],
};

const Footer = () => {
  const [formData, setFormData] = useState({ email: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const SendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { email: formData.email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setFormData({ email: "" });
        toast.success("Email Submitted Successfully");
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  };

  return (
    <footer className="footer projects shadow-2xl">
      <ToastContainer
        className="text-2xl"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="footer-top md:section">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/" className="flex justify-center md:justify-start">
              <Image
                src={logo}
                alt="Elocate"
                width={100}
                height={100}
                className="logo"
              />
            </Link>
            <form onSubmit={SendMsg} className="newsletter-form mt-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="email-field"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                className="form-btn"
                aria-label="Subscribe to our newsletter"
              >
                <IonIcon icon={paperPlane} aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <p className="footer-list-title">{footerConfig.company.title}</p>
            <ul className="mt-4 space-y-2">
              {footerConfig.company.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-contact">
            <p className="footer-list-title">Contact Us</p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-3">
                <IonIcon icon={location} className="text-primary" />
                <span>Your Address Here</span>
              </li>
              <li className="flex items-center gap-3">
                <IonIcon icon={call} className="text-primary" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <IonIcon icon={mail} className="text-primary" />
                <span>info@elocate.com</span>
              </li>
            </ul>
            <div className="social-icons mt-6 flex gap-4">
              {footerConfig.social.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={social.icon}
                >
                  <IonIcon icon={social.icon} size="large" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container flex flex-col md:flex-row justify-between items-center py-4">
          <p className="copyright text-center md:text-left">
            &copy; 2023 ELocate | All Rights Reserved by{" "}
            <Link href="#" className="copyright-link">
              Spam Byte
            </Link>
          </p>
          <ul className="footer-bottom-list flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:mt-0">
            {footerConfig.legal.links.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="footer-bottom-link">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;