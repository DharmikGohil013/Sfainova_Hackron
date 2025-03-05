"use client";
import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { paperPlane } from "ionicons/icons";
import { location } from "ionicons/icons";
import { call } from "ionicons/icons";
import { mail } from "ionicons/icons";
import { logoLinkedin } from "ionicons/icons";
import { logoTwitter } from "ionicons/icons";
import { logoInstagram } from "ionicons/icons";
import { logoWhatsapp } from "ionicons/icons";
import logo from "../../assets/Bugbb2.png";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    } as Pick<typeof formData, keyof typeof formData>);
    ;
  };

  const SendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    const templateParams = {
      email: formData.email,
    };

    emailjs
      .send(
        "service_jqn5flv",
        "template_ppph1w9",
        templateParams,
        "ddYcz13MvW01UFF5u"
      )
      .then((result: { text: any }) => {
        setFormData({
          email: "",
        });
        toast.success("Email Submitted Successfully");
      })
      .catch((error: { text: any }) => {
        toast.error("Something Went Wrong");
      });
  };
  return (
    <footer className="footer projects shadow-2xl">
      <div className="footer-top md:section">
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
        <div className="container">
          <div className="footer-brand">
            <Link href="/">
              <Image
                src={logo}
                alt="Elocate"
                width={100}
                height={100}
                className="logo mx-auto md:mx-0"
              />
            </Link>
            {/* <p className="footer-text">
            ELocate: Transforming Ai-Base Management. Find Ai-Base facilities effortlessly with our platform. Your key to responsible recycling and sustainability.
            </p> */}
            <form onSubmit={SendMsg} className="newsletter-form mb-0 md:mb-4">
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
                <IonIcon icon={paperPlane} aria-hidden="true"></IonIcon>
              </button>
            </form>
          </div>
          
          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Company</p>
            </li>
            <li>
              <Link href="/aboutus" className="footer-link">
                About us
              </Link>
            </li>

            <li>
              <Link href="/education" className="footer-link">
                Education
              </Link>
            </li>

            <li>
              <Link href="/facilities" className="footer-link">
                Ai-Base Facilities
              </Link>
            </li>

            <li>
              <Link href="/news" className="footer-link">
                Latest News
              </Link>
            </li>

            <li>
              <Link href="/contactus" className="footer-link">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="footer-link">
                Our Blog
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
        <p className="copyright">
            &copy; 2023 ELocate | All Rights Reserved by{" "}
            <Link href="#" className="copyright-link">
              Spam Byte
            </Link>
          </p>
          <ul className="footer-bottom-list">
            <li>
              <Link href="/privacypolicy" className="footer-bottom-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/termsandservices" className="footer-bottom-link">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
