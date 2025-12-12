import React, { useState } from "react";
import { firestore } from "../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import "./book.css";
import tentLogo from "../Assets/tent.png";
import domeLogo from "../Assets/tent.png";
import tentShow from "../Assets/tent-show.png";
import qrCodeImage from "../Assets/QR2.jpg";

function Book({ stayType }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTents, setSelectedTents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [numberOfMales, setNumberOfMales] = useState("");
  const [numberOfFemales, setNumberOfFemales] = useState("");

  const handleTentSelect = (tentNumber) => {
    setSelectedTents((prevSelectedTents) =>
      prevSelectedTents.includes(tentNumber)
        ? prevSelectedTents.filter((tent) => tent !== tentNumber)
        : [...prevSelectedTents, tentNumber]
    );
  };

  const validateForm = async (e) => {
    e.preventDefault();
    const errorMessages = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!firstName) errorMessages.firstName = "First Name is required.";
    if (!lastName) errorMessages.lastName = "Last Name is required.";
    if (!email || !emailPattern.test(email))
      errorMessages.email = "Please enter a valid email address.";
    if (!phone || !phonePattern.test(phone))
      errorMessages.phone = "Please enter a valid 10-digit phone number.";
    if (!checkIn) errorMessages.checkIn = "Check-In date is required.";
    if (!checkOut) errorMessages.checkOut = "Check-Out date is required.";
    if (selectedTents.length === 0)
      errorMessages.selectedSeats = "Please select at least one seat.";

    setErrors(errorMessages);

    if (Object.keys(errorMessages).length === 0) {
      const formData = {
        firstName,
        lastName,
        email,
        phone,
        numberOfMales,
        numberOfFemales,
        checkIn,
        checkOut,
        selectedSeats: selectedTents,
      };

      try {
        // Save data to Firestore
        const docRef = await addDoc(collection(firestore, "bookings"), formData);
        console.log("Booking added with ID:", docRef.id);

        // Show success alert and popup
        alert("Please make payment on next page!");
        setShowPopup(true);

        // Clear form data
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setNumberOfMales("");
        setNumberOfFemales("");
        setCheckIn("");
        setCheckOut("");
        setSelectedSeats([]);
        setSelectedTents([]);
      } catch (error) {
        console.error("Error adding booking to Firestore:", error);
        alert("Failed to submit booking. Please try again.");
      }
    }
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  const getLogo = () => {
    if (stayType === "Tent Glam") return tentLogo;
    if (stayType === "Dome") return domeLogo;
    return tentLogo;
  };
  return (
    <div className="book-container">
      <div className="form-container">
      <form onSubmit={validateForm}>
  <div className="logo-image-header">
    <div className="logo-container">
      <img src={getLogo()} alt={`${stayType} Logo`} className="logo" />
    </div>
    <div className="logo-header">
      <h3 className="book-now-heading">Book Now - {stayType}</h3>
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="firstName" className="form-label">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        className="form-input"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {errors.firstName && (
        <p className="error-message">{errors.firstName}</p>
      )}
    </div>

    <div className="form-group">
      <label htmlFor="lastName" className="form-label">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        className="form-input"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {errors.lastName && (
        <p className="error-message">{errors.lastName}</p>
      )}
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="example@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />
      {errors.email && <p className="error-message">{errors.email}</p>}
    </div>

    <div className="form-group">
      <label htmlFor="phone" className="form-label">
        Phone
      </label>
      <input
        type="text"
        name="phone"
        id="phone"
        placeholder="1234567890"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="form-input"
      />
      {errors.phone && <p className="error-message">{errors.phone}</p>}
    </div>
  </div>

  {/* New Section for Number of People */}
  <div className="form-row">
  <label className="form-label" style={{ display: "block", margin: "0 auto" }}>

</label>
    <div className="form-group">
    <label>Males</label>
    <input
            type="number"
            name="numberOfMales"
            id="numberOfMales"
            placeholder="Number of Males"
            className="form-input"
            value={numberOfMales}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0 || value === "") {
                setNumberOfMales(value);
              }
            }}
          />
    </div>
    <div className="form-group">
      <label>Females</label>
      <input
        type="number"
        name="numberOfFemales"
        id="numberOfFemales"
        placeholder="Number of Females"
        className="form-input"
        value={numberOfFemales}
        onChange={(e) => {
          const value = e.target.value;
          if (value >= 0 || value === "") {
            setNumberOfFemales(value);
          }
        }}
      />
    </div>
    {errors.numberOfPeople && (
      <p className="error-message">{errors.numberOfPeople}</p>
    )}
  </div>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="checkIn" className="form-label">
        Check-In
      </label>
      <input
        type="date"
        name="checkIn"
        id="checkIn"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="form-input"
      />
      {errors.checkIn && (
        <p className="error-message">{errors.checkIn}</p>
      )}
    </div>

    <div className="form-group">
      <label htmlFor="checkOut" className="form-label">
        Check-Out
      </label>
      <input
        type="date"
        name="checkOut"
        id="checkOut"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="form-input"
      />
      {errors.checkOut && (
        <p className="error-message">{errors.checkOut}</p>
      )}
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="seatNumber" className="form-label">
        Selected Seats
      </label>
      <input
        type="text"
        name="seatNumber"
        id="seatNumber"
        value={selectedTents.join(", ")}
        readOnly
        className="form-input"
      />
      {errors.selectedSeats && (
        <p className="error-message">{errors.selectedSeats}</p>
      )}
    </div>
  </div>

  <button type="submit" className="submit-button">
    Submit
  </button>
</form>

      </div>

      <div className="select-seat-container">
        <h3>Select Seat</h3>
        <div className="grid-container">
          {Array.from({ length: 80 }, (_, index) => (
            <button
              key={`grid-seat-${index + 1}`}
              className={`grid-button ${
                selectedTents.includes(index + 1) ? "selected" : ""
              }`}
              onClick={() => handleTentSelect(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Popup for QR code and payment instructions */}
      {showPopup && (
        <div className="popup-overlay-x">

          <div className="popup-content-x">

            <div className="popup-headingg">
            <h2>Payment Instructions</h2>
            </div>
            <div className="popup-all-payment">
            <div className="upi">
            <img src={qrCodeImage} alt="QR Code" className="qr-code-image" />
            
            </div>
            <div className="bank-acc">
              <table className="acc-details">
                <tr>
                  <th>Account holder name:</th>
                  <td>Narendra Atmaling Gore</td>
                </tr>
                <tr>
                  <th>Bank:</th>
                  <td>
                  Bank of Baroda
                  </td>
                </tr>
                <tr>
                  <th>A/c No:</th>
                  <td>04518100000979</td>
                </tr>
                <tr>
                  <th>IFSC Code:</th>
                  <td>BARB0SHIPOO</td>
                </tr>
                <tr>
                  <th>Branch:</th>
                  <td>Shivaji Nagar</td>
                </tr>
              </table>
            </div>
            </div>

            <div className="send-screenshot">
            <div className="pop-1">
            <p>
              Please make the payment and send a screenshot to WhatsApp number:{" "}
              <br />
              <strong>+91 8452136887</strong>
            </p>
            </div>
            <div className="pop-2">
            <button
              className="close-popup-button"
              onClick={() => setShowPopup(false)}
            >
              Close
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