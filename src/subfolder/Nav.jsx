import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Assets/logo.png";
import "../subfolder/Nav.css";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setShowMenu(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="nav-navbar">
      <img src={logo} alt="Logo" id="nav-logo" />

      <div className="nav-main-nav">
        <div className="nav-desktop-book-now">
          <button className="nav-book-now-btn">
            <NavLink to="/login" className="nav-book-now-link">
              Book Now
            </NavLink>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="nav-desktop-menu">
          <NavLink
            to="/HomeP"
            className={({ isActive }) =>
              isActive ? "nav-desktop-menu-list-item nav-active" : "nav-desktop-menu-list-item"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-desktop-menu-list-item nav-active" : "nav-desktop-menu-list-item"
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive ? "nav-desktop-menu-list-item nav-active" : "nav-desktop-menu-list-item"
            }
          >
            About Us
          </NavLink>

          {/* Gallery Link with Dropdown */}
          <div
            className="nav-gallery-dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <NavLink
              to="/glam"
              className={({ isActive }) =>
                isActive ? "nav-desktop-menu-list-item nav-active" : "nav-desktop-menu-list-item"
              }
            >
              Gallery
              <span className="nav-down-arrow">▼</span>
            </NavLink>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <NavLink
                  to="/glam"
                  className={({ isActive }) =>
                    isActive ? "nav-dropdown-item nav-active" : "nav-dropdown-item"
                  }
                  onClick={handleLinkClick}
                >
                  Tent Gallery
                </NavLink>
                <NavLink
                  to="/glamG"
                  className={({ isActive }) =>
                    isActive ? "nav-dropdown-item nav-active" : "nav-dropdown-item"
                  }
                  onClick={handleLinkClick}
                >
                  Glam Gallery
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="nav-mobile-menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="nav-mobile-menu">
          <NavLink
            to="/HomeP"
            className={({ isActive }) =>
              isActive ? "nav-mobile-menu-list-item nav-active" : "nav-mobile-menu-list-item"
            }
            onClick={handleLinkClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-mobile-menu-list-item nav-active" : "nav-mobile-menu-list-item"
            }
            onClick={handleLinkClick}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/create-account"
            className={({ isActive }) =>
              isActive ? "nav-mobile-menu-list-item nav-active" : "nav-mobile-menu-list-item"
            }
            onClick={handleLinkClick}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive ? "nav-mobile-menu-list-item nav-active" : "nav-mobile-menu-list-item"
            }
            onClick={handleLinkClick}
          >
            About
          </NavLink>

          {/* Mobile Dropdown */}
          <div className="nav-gallery-dropdown" onClick={toggleDropdown}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-desktop-menu-list-item" : "nav-desktop-menu-list-item"
              }
            >
              Gallery
              <span className="nav-down-arrow nav-active" >▼</span>
            </NavLink>

            {/* Mobile Dropdown Menu */}
            {dropdownOpen && (
              <div className="nav-mobile-dropdown-menu">
                <NavLink
                  to="/glam"
                  className={({ isActive }) =>
                    isActive ? "nav-mobile-dropdown-item nav-active" : "nav-dropdown-item"
                  }
                  onClick={handleLinkClick}
                >
                  Tent Gallery
                </NavLink>
                <NavLink
                  to="/glamG"
                  className={({ isActive }) =>
                    isActive ? "nav-mobile-dropdown-item nav-active" : "nav-dropdown-item"
                  }
                  onClick={handleLinkClick}
                >
                  Glam Gallery
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
