import React, { useState, useEffect } from "react";
import pawana1 from "../Assets/pawana1.jpg"; // Replace with your actual image paths
import pawana2 from "../Assets/pawana2.jpg";
import pawana3 from "../Assets/pawana3.jpg";
import "../subfolder/Intro.css";

export default function Intro() {
  const images = [pawana1, pawana2, pawana3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  // Function to handle dot clicks
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="hero-content">
          <p>Welcome To</p>
          <h1>
            Ethereal Hills<br /> <span>Camping & Glamping</span>
          </h1>
          {/* <button className="call-now">Book Now</button> */}
        </div>
      </div>
      {/* Dots for navigation */}
      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
