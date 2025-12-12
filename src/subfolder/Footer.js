import React, { useState } from "react";
import logo from "../Assets/logo.png";
import facebook from "../Assets/facebook.png";
import insta from "../Assets/insta.png";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle the dropdown visibility
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Mission */}
        <div className="footer-section logo-mission">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>
            Our mission is to inspire people to connect with nature and
            experience the joys of camping. We aim to provide a comprehensive
            camping experience by offering a wide range of camping gear and
            accessories, along with expert advice and resources to help campers
            plan and prepare for their trips.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <NavLink
                to="HomeP"
                className={({ isActive }) =>
                  isActive
                    ? "desktopmenuListitem active"
                    : "desktopmenuListitem"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutus"
                className={({ isActive }) =>
                  isActive
                    ? "desktopmenuListitem active"
                    : "desktopmenuListitem"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/glamG"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                Glam Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "desktopmenuListitem active"
                    : "desktopmenuListitem"
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/policy"
                className={({ isActive }) =>
                  isActive
                    ? "desktopmenuListitem active"
                    : "desktopmenuListitem"
                }
              >
                Privacy Policy
              </NavLink>
            </li>
            
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <div className="footer-contacts">
            <h3>Contact</h3>
            

            <p>
              <strong>Address:</strong>Beside Princess Vista, Khadak Gawande, Thakusrsai, Pawanalake, Lonawala Pune-Maharashtra-412108.
            </p>
            <p> 
              <strong>Mobile No:</strong>+91-7720008787
            </p>
            <p>
              <strong>Email:</strong>etherealhillsglamping@gmail.com  contact@etherealhillsglamping.com
            </p>
          </div>
          <div className="social-icons">
            <a href="https://www.facebook.com/etherealhillsglamping">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/etherealhillsglamping/profilecard/?igsh=MWJrMzRzNThpbnRobw==">
              <img src={insta} alt="Instagram" />
            </a>
            
          </div>
        </div>
      </div>
      
      

      <div className="footer-bottom">
        Copyright © 2024. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
