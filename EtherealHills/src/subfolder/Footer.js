import React from "react";
import logo from "../Assets/logo.png";
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quick: [
      { path: "/HomeP", label: "Home" },
      { path: "/aboutus", label: "About Us" },
      { path: "/glam", label: "Gallery" },
      { path: "/contact", label: "Contact Us" },
      { path: "/policy", label: "Privacy Policy" },
    ],
    contact: [
      {
        icon: <FaMapMarkerAlt />,
        text: "Beside Princess Vista, Khadak Gawande, Thakursai, Pawna Lake, Lonavala, Pune - 412108"
      },
      {
        icon: <FaPhone />,
        text: "+91 84215 11990 / +91 8421174213",
        link: "+91 84215 11990 / +91 8421174213"
      },
      {
        icon: <FaEnvelope />,
        text: "contact@etherealhillsglamping.com",
        link: "mailto:contact@etherealhillsglamping.com"
      },
      {
        icon: <FaEnvelope />,
        text: "etherealhillsglamping@gmail.com",
        link: "mailto:etherealhillsglamping@gmail.com"
      }
    ],
    social: [
      { icon: <FaFacebookF />, link: "#", label: "Facebook", disabled: true },
      { icon: <FaInstagram />, link: "https://www.instagram.com/etherealhills_camping?igsh=eWxkeDJyemV4ejE3", label: "Instagram" }
    ]
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="Ethereal Hills" className="brand-logo" />
              <div className="brand-text">
                <h3 className="brand-name">Ethereal Hills</h3>
                <p className="brand-tagline">Premium Camping & Glamping</p>
              </div>
            </div>
            <p className="brand-description">
              We create unforgettable experiences where luxury meets nature. 
              Our mission is to inspire meaningful connections with the outdoors 
              through premium camping and glamping adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {footerLinks.quick.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `footer-link ${isActive ? 'footer-link-active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Information</h4>
            <ul className="contact-info">
              {footerLinks.contact.map((item, index) => (
                <li key={index} className="contact-item">
                  <span className="contact-icon">{item.icon}</span>
                  {item.link ? (
                    <a href={item.link} className="contact-link">
                      {item.text}
                    </a>
                  ) : (
                    <span className="contact-text">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-title">Stay Updated</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            
            <div className="social-section">
              <h5 className="social-title">Follow Us</h5>
              <div className="social-icons">
                {footerLinks.social.map((social, index) => (
                  social.disabled ? (
                    <span
                      key={index}
                      className="social-icon social-icon-disabled"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </span>
                  ) : (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            &copy; {currentYear} Ethereal Hills Camping & Glamping. All rights reserved.
          </p>
          <div className="footer-legal">
            <NavLink to="/policy" className="legal-link">
              Privacy Policy
            </NavLink>
            <span className="legal-separator">•</span>
            <span className="legal-text">
              Designed with &hearts; for nature lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;