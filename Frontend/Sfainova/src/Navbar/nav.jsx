import React from "react";
import "../Style/nav.css"; // Custom styles for the navbar
import logo from "../assets/img/bugb.png"; // Adjust path as needed

// Navigation links data
const navLinks = [
  { title: "Home", href: "#", id: "home" },
  { title: "About", href: "#", id: "about" },
  { title: "Services", href: "#", id: "services" },
  { title: "Contact", href: "#", id: "contact" },
];

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* Compact brand logo and name */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="BugBusters Logo"
            className="me-1 logo-img"
            width="32" // Reduced size for compactness
            height="32"
            loading="lazy"
          />
          BugBusters
        </a>

        {/* Toggler button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Compact navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a className="nav-link" href={link.href}>
                  {link.title}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a
                className="btn btn-primary rounded-pill ms-lg-2 cta-btn"
                href="#signup"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;