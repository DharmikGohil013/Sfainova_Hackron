"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { menuOutline, closeOutline, location } from "ionicons/icons";
import logo from "../../assets/bugb.png";
import { getUser, handleLogout, isAuthenticated } from "../sign-in/auth";

interface NavItemProps {
  label: string;
}

const Header = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [locations, setLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const user = getUser();

  const toggleNavbar = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 header bg-white bg-opacity-95 ${
        isHeaderActive ? "active" : ""
      }`}
      data-header
    >
      <div className="container shadow-md py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="ELocate"
            width={100}
            height={100}
            className="logo ml-4 md:ml-16"
          />
        </Link>

        {/* Navbar */}
        <nav className={`navbar ${isNavbarActive ? "active" : ""}`} data-navbar>
          <div className="wrapper">
            <button
              className="nav-close-btn"
              aria-label="close menu"
              data-nav-toggler
              onClick={toggleNavbar}
            >
              <IonIcon
                icon={closeOutline}
                className={`close-icon ${isNavbarActive ? "" : "hidden"}`}
              ></IonIcon>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="navbar-list">
            <NavItem label="Home" />
            <NavItem label="About" />
            <NavItem label="E-Facilities" />
            <NavItem label="Recycle" />
            <NavItem label="Education" />
            <NavItem label="Expire Products" />
            <NavItem label="Dashboard" />
          </ul>
        </nav>

        {/* Location */}
        <h1 className="font-montserrat font-bold text-xl ml-12 md:ml-4 md:text-2xl text-emerald-600 flex items-center gap-[1vh]">
          <IonIcon icon={location} aria-hidden="true" role="img"></IonIcon>
          {locations || "Loading..."}
        </h1>

        {/* User Dropdown or Sign-In */}
        {user ? (
          <div className="relative">
            <button
              className="md:mr-8 text-sm md:text-xl font-semibold"
              onClick={handleToggleDropdown}
            >
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 projects p-4 shadow-md divide-y rounded-lg w-44 mt-2">
                <Link href="/profile" className="hover:text-emerald-500">
                  Profile
                </Link>
                <button className="hover:text-emerald-500" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/sign-in" className="btn-md btn-outline md:mr-4">
              SignIn
            </Link>
          </>
        )}

        {/* Hamburger Menu */}
        <button
          className="nav-open-btn"
          aria-label="open menu"
          data-nav-toggler
          onClick={toggleNavbar}
        >
          <IonIcon icon={menuOutline} aria-hidden="true" role="img"></IonIcon>
        </button>

        {/* Overlay */}
        <div
          className={`overlay ${isNavbarActive ? "active" : ""}`}
          data-nav-toggler
          data-overlay
          onClick={toggleNavbar}
        ></div>
      </div>
    </header>
  );
};

// Navigation Item Component
const NavItem = ({ label }: NavItemProps) => {
  return (
    <li className="navbar-link">
      <Link
        href={
          label === "Home"
            ? "/"
            : label === "Expire Products"
            ? "/expired-products"
            : label === "Dashboard"
            ? "/dashboard"
            : `/${label.toLowerCase().replace(/ /g, "-")}`
        }
      >
        {label}
      </Link>
    </li>
  );
};

export default Header;