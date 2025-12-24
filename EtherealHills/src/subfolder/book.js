import React, { useState } from "react";
import "./book.css";
import tentLogo from "../Assets/tent.png";
import domeLogo from "../Assets/tent.png";
import qrCodeImage from "../Assets/QR2.jpg";
import { FiCalendar, FiUser, FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";
import { FaMale, FaFemale } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const PRICE_PER_PERSON = 1499;
const MIN_CHECKIN_DATE = "2025-12-31";

const parseISODate = (value) => {
  if (!value) return null;
  const [y, m, d] = value.split("-").map((v) => Number.parseInt(v, 10));

  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const formatISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

function Book({ stayType }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    numberOfMales: "",
    numberOfFemales: "",
    checkIn: "",
    checkOut: "",
  });
  
  const [errors, setErrors] = useState({});
  const [selectedTents, setSelectedTents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numberOfMales = Number.parseInt(formData.numberOfMales, 10) || 0;
  const numberOfFemales = Number.parseInt(formData.numberOfFemales, 10) || 0;
  const totalPeople = numberOfMales + numberOfFemales;
  const maxPeopleAllowed = selectedTents.length * 2;
  const totalAmount = totalPeople * PRICE_PER_PERSON;

  const minCheckOutDate = formData.checkIn
    ? formatISODate(addDays(parseISODate(formData.checkIn), 1))
    : "";

  const handleTentSelect = (tentNumber) => {
    setSelectedTents((prevSelectedTents) =>
      prevSelectedTents.includes(tentNumber)
        ? prevSelectedTents.filter((tent) => tent !== tentNumber)
        : [...prevSelectedTents, tentNumber]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "checkIn") {
      setFormData((prev) => {
        const next = { ...prev, checkIn: value };
        if (!value) {
          next.checkOut = "";
          return next;
        }

        const nextMinCheckOut = formatISODate(addDays(parseISODate(value), 1));
        if (next.checkOut && next.checkOut < nextMinCheckOut) {
          next.checkOut = "";
        }
        return next;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errorMessages = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!formData.firstName) errorMessages.firstName = "First Name is required";
    if (!formData.lastName) errorMessages.lastName = "Last Name is required";
    if (!formData.email || !emailPattern.test(formData.email)) {
      errorMessages.email = "Valid email is required";
    }
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      errorMessages.phone = "Valid 10-digit phone required";
    }
    if (!formData.checkIn) errorMessages.checkIn = "Check-In date is required";
    if (!formData.checkOut) errorMessages.checkOut = "Check-Out date is required";
    if (selectedTents.length === 0) {
      errorMessages.selectedTents = "Please select at least one tent";
    }

    if (formData.checkIn) {
      const checkInDate = parseISODate(formData.checkIn);
      const earliest = parseISODate(MIN_CHECKIN_DATE);
      if (checkInDate && earliest && checkInDate < earliest) {
        errorMessages.checkIn = "Bookings start from 31-12-2025";
      }
    }

    if (formData.checkIn && formData.checkOut) {
      const checkInDate = parseISODate(formData.checkIn);
      const checkOutDate = parseISODate(formData.checkOut);
      if (checkInDate && checkOutDate) {
        const minCheckOut = addDays(checkInDate, 1);
        if (checkOutDate < minCheckOut) {
          errorMessages.checkOut = "Check-Out must be at least 1 day after Check-In";
        }
      }
    }

    if (totalPeople <= 0) {
      errorMessages.totalPeople = "Please enter number of people";
    }

    if (selectedTents.length > 0 && totalPeople > maxPeopleAllowed) {
      errorMessages.totalPeople = `Only 2 persons allowed in one tent (max ${maxPeopleAllowed} for ${selectedTents.length} tent(s))`;
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const bookingData = {
      ...formData,
      stayType,
      selectedTents,
      bookingDate: new Date().toISOString(),
      bookingId: `EH-${Date.now()}`
    };

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || 'Failed to submit booking');
      }

      alert("Please make payment on next page!");
      setShowPopup(true);
      
      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        numberOfMales: "",
        numberOfFemales: "",
        checkIn: "",
        checkOut: "",
      });
      setSelectedTents([]);
      
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLogo = () => {
    if (stayType === "Tent Glam") return tentLogo;
    if (stayType === "Dome") return domeLogo;
    return tentLogo;
  };

  // Generate tent numbers 1-80
  const generateTentNumbers = () => {
    return Array.from({ length: 80 }, (_, i) => i + 1);
  };

  return (
    <div className="book-container">
      {/* Header Section */}
      <div className="book-header">
        <h1>Book Your {stayType}</h1>
        <p>Complete the form below to reserve your spot</p>
      </div>

      <div className="book-content">
        {/* Left Column - Booking Form */}
        <div className="form-section">
          <div className="form-card">
            <div className="form-header">
              <img src={getLogo()} alt={stayType} className="stay-logo" />
              <h2>{stayType} Booking</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiUser className="icon" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && (
                    <span className="error-msg">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    <FiUser className="icon" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && (
                    <span className="error-msg">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiMail className="icon" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <span className="error-msg">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    <FiPhone className="icon" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <span className="error-msg">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="people-note">
                  Note: Only 2 persons allowed in one tent.
                </div>
                <div className="form-group">
                  <label>
                    <FaMale className="icon" />
                    Number of Males
                  </label>
                  <input
                    type="number"
                    name="numberOfMales"
                    value={formData.numberOfMales}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaFemale className="icon" />
                    Number of Females
                  </label>
                  <input
                    type="number"
                    name="numberOfFemales"
                    value={formData.numberOfFemales}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {errors.totalPeople && (
                <span className="error-msg">{errors.totalPeople}</span>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FiCalendar className="icon" />
                    Check-In Date *
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={MIN_CHECKIN_DATE}
                    className={errors.checkIn ? 'error' : ''}
                  />
                  {errors.checkIn && (
                    <span className="error-msg">{errors.checkIn}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    <FiCalendar className="icon" />
                    Check-Out Date *
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={minCheckOutDate}
                    disabled={!formData.checkIn}
                    className={errors.checkOut ? 'error' : ''}
                  />
                  {errors.checkOut && (
                    <span className="error-msg">{errors.checkOut}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Selected Tents</label>
                <div className="selected-tents-display">
                  {selectedTents.length > 0 ? (
                    <div className="tents-list">
                      {selectedTents.map(tent => (
                        <span key={tent} className="tent-badge">{tent}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="no-tents">No tents selected</span>
                  )}
                </div>
                {errors.selectedTents && (
                  <span className="error-msg">{errors.selectedTents}</span>
                )}
              </div>

              <div className="price-summary">
                <div className="price-row">
                  <span>Price per person</span>
                  <strong>₹{PRICE_PER_PERSON}</strong>
                </div>
                <div className="price-row">
                  <span>Total people</span>
                  <strong>{totalPeople}</strong>
                </div>
                <div className="price-row total">
                  <span>Total amount</span>
                  <strong>₹{totalAmount}</strong>
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="btn-icon" />
                    Confirm Booking
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Tent Selection */}
        <div className="tent-section">
          <div className="tent-selection-card">
            <h3>Select Your Tents</h3>
            <p className="tent-subtitle">Choose tent numbers (1-80)</p>
            
            <div className="tent-selection-info">
              <div className="info-item">
                <span className="available"></span>
                <span>Available</span>
              </div>
              <div className="info-item">
                <span className="selected"></span>
                <span>Selected</span>
              </div>
              <div className="info-item">
                <span className="selected-count">{selectedTents.length}</span>
                <span>Tents Selected</span>
              </div>
            </div>

            <div className="booking-tent-grid">
              {generateTentNumbers().map((tentNumber) => (
                <button
                  key={tentNumber}
                  type="button"
                  onClick={() => handleTentSelect(tentNumber)}
                  className={`booking-tent-btn ${selectedTents.includes(tentNumber) ? 'selected' : ''}`}
                >
                  {tentNumber}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Payment Popup */}
      {showPopup && (
        <div className="payment-popup">
          <div className="popup-overlay" onClick={() => setShowPopup(false)}></div>
          
          <div className="popup-content">
            <div className="popup-header">
              <h2>Complete Your Payment</h2>
              <button 
                className="close-btn"
                onClick={() => setShowPopup(false)}
              >
                ×
              </button>
            </div>

            <div className="payment-methods">
              {/* QR Code Section */}
              <div className="payment-method">
                <h4>Scan QR Code to Pay</h4>
                <div className="qr-section">
                  <img src={qrCodeImage} alt="QR Code" className="qr-code" />
                  <div className="qr-info">
                    <p>Scan with any UPI app</p>
                    <small>Recommended for instant payment</small>
                  </div>
                </div>
              </div>

              {/* Bank Details Section */}
              <div className="payment-method">
                <h4>Bank Transfer Details</h4>
                <div className="bank-details">
                  <div className="bank-row">
                    <span>Account Holder:</span>
                    <strong>Narendra Atmaling Gore</strong>
                  </div>
                  <div className="bank-row">
                    <span>Bank:</span>
                    <span>Bank of Baroda</span>
                  </div>
                  <div className="bank-row">
                    <span>A/c No:</span>
                    <code>04518100000979</code>
                  </div>
                  <div className="bank-row">
                    <span>IFSC Code:</span>
                    <code>BARB0SHIPOO</code>
                  </div>
                  <div className="bank-row">
                    <span>Branch:</span>
                    <span>Shivaji Nagar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-instructions">
              <div className="alert-box">
                <FiCheckCircle className="alert-icon" />
                <div>
                  <strong>Important:</strong> After payment, send screenshot to WhatsApp
                  <a href="https://wa.me/918452136887" className="whatsapp-link">
                    +91 84521 36887
                  </a>
                </div>
              </div>
              
              <div className="popup-actions">
                <button 
                  className="got-it-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Got it, I'll make payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Book;