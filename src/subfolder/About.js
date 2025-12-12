import React from "react";
import { useNavigate } from 'react-router-dom';
import "./About.css";
import aboutbg from "../Assets/aboutbg.jpg"; // Import the image
import gallary1 from "../Assets/gallary1.jpg";
import gallery2 from "../Assets/gallery2.jpg";
import gallary3 from "../Assets/gallary3.jpg";
import gallary4 from "../Assets/gallary4.jpg";
import gallary5 from "../Assets/gallary5.jpg";
import gallary6 from "../Assets/gallary6.jpg";
import gallary7 from "../Assets/gallary7.jpg";

const Aboutus = () => {
  const NavigateTo = useNavigate();
  return (
    <div className="main-div-contact">
      {/* About Us Section */}
      <section className="about-us">
        <div className="wave-section">
          <div className="overlay">
            <h1>About Us</h1>
            <div className="button-container">
        <button onClick={() =>  NavigateTo('/home')} className="nav-button">
          Home
        </button>
        <button onClick={() => NavigateTo('/contact')} className="nav-button">
          Contact Us
        </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="about-content">
        <div className="container">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Welcome to Pawna Lake Camping, where comfort meets nature, our
              mission has been to provide a serene and luxurious retreat for
              travelers seeking solace amidst stunning landscapes.
            </p>
            <p>
              At Pawna Lake Camping, we combine premium accommodations with
              breathtaking views and exceptional hospitality. Whether you're
              here for an adventurous escape or a tranquil getaway, we ensure
              your stay is unforgettable.
            </p>
          </div>
          <div className="about-image">
            {/* Using the imported aboutbg image */}
            <img src={aboutbg} alt="About Nirwana Stays" />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission">
        <div className="container2">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide our guests with an authentic outdoor <br />
            experience, promoting sustainability and environmental 
            consciousness. <br /> We are dedicated to preserving the natural beauty of 
            the lake and the <br /> surrounding area while providing a safe, enjoyable, <br />
            and comfortable stay for all our visitors.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      
    </div>
  );
};

export default Aboutus;
