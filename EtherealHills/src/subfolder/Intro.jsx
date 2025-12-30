import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pawana1 from "../Assets/pawana1.jpg";
import pawana2 from "../Assets/pawana2.jpg";
import pawana3 from "../Assets/pawana3.jpg";
import bon from "../Assets/bon.webp";
import camp from "../Assets/camp.jpg";
import offerr from "../Assets/offerr.webp";
import styles from "../subfolder/Intro.module.css";

export default function Intro() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const images = isMobile ? [bon, camp, offerr] : [pawana1, pawana2, pawana3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);

    update();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
    } else {
      mq.addListener(update);
    }

    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", update);
      } else {
        mq.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles["intro-container"]}>
      <div className={styles["hero-section"]}>
        <div
          className={styles["hero-background"]}
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        >
          {!isMobile && (
            <button
              className={`${styles["nav-btn"]} ${styles["prev-btn"]}`}
              onClick={goToPrev}
            >
              <span className={styles.chevron}>‹</span>
            </button>
          )}

          <div className={styles["hero-content"]}>
            <div className={styles["hero-subtitle"]}>
              <span className={styles["accent-line"]}></span>
              <p className={styles["welcome-text"]}>Welcome To</p>
            </div>
            <h1 className={styles["hero-title"]}>
              <span className={styles["title-line"]}>Ethereal Hills</span>
              <span className={styles["title-subline"]}>Camping & Glamping</span>
            </h1>
            <button
              className={styles["cta-button"]}
              onClick={() =>
                navigate("/package-details", { state: { stayType: "Tent Stay" } })
              }
            >
              <span>Book Now</span>
              <span className={styles.arrow}>→</span>
            </button>
          </div>

          {!isMobile && (
            <button
              className={`${styles["nav-btn"]} ${styles["next-btn"]}`}
              onClick={goToNext}
            >
              <span className={styles.chevron}>›</span>
            </button>
          )}
        </div>
      </div>

      {!isMobile && (
        <div className={styles["indicators-container"]}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => handleDotClick(index)}
            >
              <div className={styles["indicator-progress"]}></div>
            </div>
          ))}
        </div>
      )}

      {isMobile && (
        <div className={styles["mobile-indicators-container"]}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${styles["mobile-indicator"]} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => handleDotClick(index)}
            >
              <div className={styles["indicator-progress"]}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}