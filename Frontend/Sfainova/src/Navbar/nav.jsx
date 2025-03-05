import React from "react";
import "./nav.css";
import logo from "../assets/img/bugb.png"; // Adjust the path based on your folder structure

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          <img src={logo} alt="Logo" className="me-2" width="40" height="40" />
            BugBusters
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
            <li className="nav-item">
              <a className="btn btn-light rounded-pill ms-3" href="#">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
