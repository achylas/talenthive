import React, { useState } from "react";
import "./navcss.css";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa"; // Icons for menu and profile

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <span className="logo-square"></span>
        <span>Talent Hive</span>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Projects</a>
        <a href="#">Courses</a>
        <a href="#">Blogs</a>
        <a href="#">Contact</a>
      </nav>

      {/* Profile Icon */}
      <div className="profile-icon">
        <FaUserCircle size={24} />
      </div>
    </header>
  );
};

export default Navbar;
