import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import "../subfolder/Nav.css";
import { FiMenu, FiX } from "react-icons/fi";

export default function Nav({ isLoggedIn, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLinkClick = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    handleLinkClick();
    if (typeof onLogout === "function") {
      onLogout();
    }
    navigate("/HomeP");
  };

  const navLinks = [
    { path: "/HomeP", label: "Home" },
    { path: "/aboutus", label: "About Us" },
    { path: "/glam", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/HomeP")}>
          <img src={logo} alt="Ethereal Hills" className="logo-image" />
          <div className="logo-text">
            <span className="logo-main">Ethereal Hills</span>
            <span className="logo-sub">Camping & Glamping</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            {!isLoggedIn ? (
              <>
                <button
                  className="nav-btn secondary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <div className="user-menu">
                <button
                  className="nav-btn secondary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          {showMenu ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${showMenu ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="navbar-logo" onClick={() => { navigate("/HomeP"); handleLinkClick(); }}>
            <img src={logo} alt="Ethereal Hills" className="logo-image" />
            <div className="logo-text">
              <span className="logo-main">Ethereal Hills</span>
              <span className="logo-sub">Camping & Glamping</span>
            </div>
          </div>
        </div>

        <div className="mobile-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `mobile-link ${isActive ? 'mobile-link-active' : ''}`
              }
              onClick={handleLinkClick}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mobile-actions">
          {!isLoggedIn ? (
            <>
              <button
                className="mobile-btn secondary"
                onClick={() => { navigate("/login"); handleLinkClick(); }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                className="mobile-btn secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}