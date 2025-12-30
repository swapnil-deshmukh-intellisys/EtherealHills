import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Home,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from "./Contactus.module.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://etherealhills.onrender.com/api';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "", 
    phone: "",
    bookingDate: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const contactInfo = [
    {
      icon: <Mail />,
      title: "Email Address",
      details: [
        "etherealhillsglamping@gmail.com",
        "contact@etherealhillsglamping.com"
      ]
    },
    {
      icon: <Phone />,
      title: "Phone Number",
      details: ["+91-7720008787", "+91-9876543210"]
    },
    {
      icon: <MapPin />,
      title: "Location",
      details: [
        "Beside Princess Vista, Khadak Gawande",
        "Thakursai, Pawna Lake",
        "Lonavala, Pune - Maharashtra 412108"
      ]
    },
    {
      icon: <Clock />,
      title: "Business Hours",
      details: [
        "Monday - Sunday: 24/7 Available",
        "Check-in: 2:00 PM",
        "Check-out: 11:00 AM"
      ]
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.phone && !/^[0-9+\-\s]*$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || 'Failed to submit contact form');
      }

      setSuccessMessage("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "", phone: "", bookingDate: "" });
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles["contact-page"]}>
      {/* Hero Section */}
      <section className={styles["contact-hero"]}>
        <div className={styles["hero-container"]}>
          <nav className={styles["hero-nav"]}>
            <button 
              onClick={() => navigate('/home')}
              className={styles["nav-btn"]}
            >
              <Home /> Back to Home
            </button>
            <button 
              onClick={() => navigate('/aboutus')}
              className={styles["nav-btn"]}
            >
              <Info /> About Us
            </button>
          </nav>
          
          <div className={styles["hero-content"]}>
            <span className={styles["hero-badge"]}>
              <Shield /> Get in Touch
            </span>
            <h1 className={styles["hero-title"]}>
              Let's Plan Your <br /> Lakeside Escape
            </h1>
            <p className={styles["hero-subtitle"]}>
              Reach out to our team for bookings, inquiries, or custom camping experiences
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className={styles["contact-grid-section"]}>
        <div className={styles.container}>
          <div className={styles["contact-grid"]}>
            {contactInfo.map((item, index) => (
              <div key={index} className={styles["contact-card"]}>
                <div className={styles["contact-icon"]}>
                  {item.icon}
                </div>
                <h3 className={styles["contact-title"]}>{item.title}</h3>
                <div className={styles["contact-details"]}>
                  {item.details.map((detail, idx) => (
                    <p key={idx}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      {/* 
      <section className={styles["form-section"]}>
        <div className={styles.container}>
          <div className={styles["form-container"]}>
            <div className={styles["form-header"]}>
              <span className={styles["form-badge"]}>Send Message</span>
              <h2 className={styles["form-title"]}>Get in Touch</h2>
              <p className={styles["form-subtitle"]}>
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles["contact-form"]}>
              <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                  <label htmlFor="name" className={styles["form-label"]}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles["form-input"]} ${errors.name ? styles.error : ''}`}
                    
                  />
                  {errors.name && (
                    <span className={styles["error-message"]}>
                      <AlertCircle /> {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles["form-group"]}>
                  <label htmlFor="email" className={styles["form-label"]}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles["form-input"]} ${errors.email ? styles.error : ''}`}
                    
                  />
                  {errors.email && (
                    <span className={styles["error-message"]}>
                      <AlertCircle /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                  <label htmlFor="phone" className={styles["form-label"]}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles["form-input"]}
                    
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label htmlFor="bookingDate" className={styles["form-label"]}>
                    Preferred Booking Date
                  </label>
                  <input
                    type="date"
                    id="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleChange}
                    className={styles["form-input"]}
                  />
                </div>
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="message" className={styles["form-label"]}>
                  Your Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles["form-textarea"]} ${errors.message ? styles.error : ''}`}
                  placeholder="Tell us about your requirements, preferred dates, and any special requests..."
                  rows="6"
                />
                {errors.message && (
                  <span className={styles["error-message"]}>
                    <AlertCircle /> {errors.message}
                  </span>
                )}
              </div>

              {errors.submit && (
                <div className={styles["submit-error"]}>
                  <AlertCircle /> {errors.submit}
                </div>
              )}

              {successMessage && (
                <div className={styles["success-message"]}>
                  <CheckCircle /> {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles["submit-button"]}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      */}

      {/* Map Section */}
      {/* <section className={styles["map-section"]}>
        <div className={styles.container}>
          <div className={styles["map-container"]}>
            <div className={styles["map-header"]}>
              <h2 className={styles["map-title"]}>Find Us</h2>
              <p className={styles["map-subtitle"]}>
                Visit our beautiful campsite at Pawna Lake
              </p>
            </div>
            <div className={styles["map-placeholder"]}>
              <div className={styles["map-overlay"]}>
                <MapPin className={styles["map-pin"]} />
                <h3>Pawna Lake Campsite</h3>
                <p>Click to open in Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      
    </div>
  );
};

export default ContactUs;