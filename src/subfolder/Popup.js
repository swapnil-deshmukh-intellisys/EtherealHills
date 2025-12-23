import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css"; // Add styles for the popup

// Import images from the src folder
import image1 from "../Assets/Pop1.jpg";
import image2 from "../Assets/Pop2.jpg";
import image3 from "../Assets/Pop3.jpg";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false); // Initially, the popup is hidden
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true); // Show the popup if it hasn't been shown before
      localStorage.setItem("popupShown", "true"); // Mark the popup as shown
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false); // Close the popup when clicking the close button
  };

  const images = [image1, image2, image3]; // Use the imported images

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length); // Go to the next slide
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length); // Go to the previous slide
  };

  return (
    <div>
      {showPopup && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-content"]}>
            <button className={styles["close-button"]} onClick={closePopup}>
              &times;
            </button>
            <div className={styles["popup-body"]}>
              <h2>Book Now, Pay Later With 0% Interest</h2>
              <p>Book Now & Pay in 3 Easy Installments!</p>
              <div className={styles["slider-container"]}>
                <button className={styles["slider-button"]} onClick={prevSlide}>&lt;</button>
                <img
                  src={images[currentSlide]} // Display the current slide image
                  alt={`Slide ${currentSlide + 1}`}
                  className={styles["popup-image"]}
                />
                <button className={styles["slider-button"]} onClick={nextSlide}>&gt;</button>
              </div>
              <p className={styles["popup-terms"]}>T&C Apply. Contact us for more info!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
