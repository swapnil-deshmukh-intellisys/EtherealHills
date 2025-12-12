import React, { useState } from "react";
import { addContactMessage } from "../firebase"; // Import Firebase helper
import "./Contactus.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    let errorMessage = "";

    if (id === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      errorMessage = "Name can only contain alphabets and spaces.";
    } else if (id === "email" && value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
      errorMessage = "Invalid email address.";
    } else if (id === "message" && !/^[a-zA-Z\s]*$/.test(value)) {
      errorMessage = "Message can only contain alphabets and spaces.";
    }

    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error) || !formData.name || !formData.email || !formData.message) {
      alert("Please fix the errors before submitting the form.");
    } else {
      try {
        await addContactMessage(formData); // Save data to Firebase
        setSuccessMessage("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setTimeout(() => setSuccessMessage(""), 5000); // Clear message after 5 seconds
      } catch (error) {
        console.error("Error saving contact message:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="main-div-contact">
      <section className="hb">
        <div id="hero-section-id" className="hero-section">
          <nav className="hero-nav">
            <div className="info2">
              <h1>Contact Us</h1>
            </div>
            <a href="#">Home</a>
            <a href="#">About Us</a>
          </nav>
        </div>
      </section>
      <div className="cont-bg">
        <section className="contact-info">
          <h2>Contact Info</h2>
          <ul>
            <li>
              <strong>Email:</strong> etherealhillsglamping@gmail.com <br /> &emsp;&emsp;&emsp; contact@etherealhillsglamping.com
            </li>
            <li>
              <strong>Contact No:</strong> +91-7720008787
            </li>
            <li>
              <strong>Address:</strong> Beside Princess Vista, Khadak Gawande, Thakusrsai, <br /> &emsp;&emsp;&emsp;&emsp;&nbsp; Pawanalake, Lonawala Pune-Maharashtra-412108.
            </li>
          </ul>
        </section>
        <section className="contact-form">
          <h2>Feel Free to Contact Us</h2>
          <form id="contactus-form" onSubmit={handleSubmit}>
            <div className="f-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="f-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="f-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>
              {errors.message && <p className="error">{errors.message}</p>}
            </div>
            <button type="submit">Submit</button>
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
