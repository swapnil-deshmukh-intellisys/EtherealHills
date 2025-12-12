import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import "../subfolder/Nav.css";


export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" id="logo" />

      {/* Desktop Menu */}
      <div className="desktopmenu">
        <button className="book-now-btn">
          <Link to="/package" className="book-now-link">
            Book Now
          </Link>
        </button>

        <Link to="/homed" className="desktopmenuListitem">Home</Link>
        <Link to="/" className="desktopmenuListitem">Brocheur</Link>
        <Link to="/glam" className="desktopmenuListitem">Camping</Link>
        <Link to="/glamG" className="desktopmenuListitem">Glamping</Link>
        <Link to="/aboutus" className="desktopmenuListitem">AboutUs</Link>
        <Link to="/contact" className="desktopmenuListitem">ContactUs</Link>

        
       
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="navMenu">
          <Link to="/homed" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Home</Link>
          <Link to="/" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Brocheur</Link>
          <Link to="/glam" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Camping</Link>
          <Link to="/glamG" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Glamping</Link>
          <Link to="/about" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Aboutus</Link>

          <Link to="/contact" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Contact Us</Link>
          {/* <Link to="/create-account" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Sign Up</Link>
          <Link to="/login" className="mobilemenuListitem" onClick={() => setShowMenu(false)}>Login</Link> */}
        </div>
      )}
    </nav>
  );
}
