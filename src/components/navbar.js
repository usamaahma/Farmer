import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUser, FaUserPlus } from "react-icons/fa";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="/" className="navbar-logo" onClick={handleLinkClick}>
        <img src="/images/logo.png" alt="FarmApp Logo" />
      </a>

      <button className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`navbar-content ${isOpen ? "active" : ""}`}>
        <ul className="navbar-links">
          <li>
            <a href="/" onClick={handleLinkClick}>
              Home
            </a>
          </li>
          <li>
            <a href="/crops" onClick={handleLinkClick}>
              Crops
            </a>
          </li>
          <li>
            <a href="/weather" onClick={handleLinkClick}>
              Weather
            </a>
          </li>
          <li>
            <a href="/market" onClick={handleLinkClick}>
              Market
            </a>
          </li>
          <li>
            <Link
              to="/contact-us"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/login">
            <button className="btn btn-login">
              <FaUser style={{ marginRight: "8px" }} /> Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-signup">
              <FaUserPlus style={{ marginRight: "8px" }} /> Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
