// src/Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./assets/LANEIGE.svg";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link
            to="/"
            className={`nav-link ${isActive("/")}`}
            onClick={() => setMenuOpen(false)}
          >
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/new"
            className={`nav-link ${isActive("/new")}`}
            onClick={() => setMenuOpen(false)}
          >
            NEW
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className={`nav-link ${isActive("/shop")}`}
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about")}`}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
        </li>
      </ul>

      {/* Hamburger */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
