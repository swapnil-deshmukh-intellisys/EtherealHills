import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./package.module.css";
import img1 from "../Assets/features.jpg";
import img2 from "../Assets/tent1.jpg";
import img3 from "../Assets/Dj - Copy.jpg";
import imgD1 from "../Assets/dome (3).jpg";
import Feature from "./Feature";

const Package = () => {
  const navigate = useNavigate();
  const [pop, setpop] = useState(null);

  const handleBookNowClick = (stayType) => {
    navigate("/package-details", { state: { stayType } });
  };

  const openpop = (type) => {
    setpop(type);
  };

  const closepop = () => {
    setpop(null);
  };

  const packages = [
    {
      id: 0,
      title: "31st Party 2025",
      price: "₹1499",
      description: "New Year celebration package",
      image: img3,
      available: true,
      badge: "Special",
      features: [
        "✨ Camping stay",
        "🔥 Bonfire",
        "🎧 Live DJ & lights",
        "🎆 Fireworks celebration",
        "🍽️ Dinner + breakfast included",
      ],
      popupKey: "Party",
    },
    {
      id: 1,
      title: "Tent Stay",
      price: "From ₹1999",
      description: "Authentic camping experience with modern comforts",
      image: img2,
      available: true,
      badge: "Most Popular",
      features: ["BBQ Night", "Live Music", "Games & Activities", "Lake View"],
      popupKey: "Tent",
    },
    {
      id: 2,
      title: "Cottage Stay",
      price: "Starting From ₹2499",
      description: "Private cottage with premium amenities",
      image: img1,
      available: false,
      badge: "Coming Soon",
      features: ["Private Pool", "Personal Butler", "Gourmet Dining", "AC Rooms"],
      popupKey: "Cottage",
    },
    {
      id: 3,
      title: "Dome Stay",
      price: "Starting From ₹2999",
      description: "Luxury geodesic dome with panoramic views",
      image: imgD1,
      available: false,
      badge: "Premium",
      features: ["360° Views", "Private Jacuzzi", "Candlelight Dinner", "AC"],
      popupKey: "Dome",
    },
  ];

  return (
    <div className={styles["packages-section"]}>
      <div className={styles["packages-header"]}>
        <span className={styles["section-badge"]}>Exclusive Offers</span>
        <h1 className={styles["section-title"]}>Our Premium Packages</h1>
        <p className={styles["section-subtitle"]}>
          Choose from our curated selection of luxury camping experiences
        </p>
      </div>

      <div className={styles["packages-grid"]}>
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`${styles["package-card"]} ${pkg.available ? '' : styles["coming-soon"]}`}
            data-aos="fade-up"
          >
            <div className={styles["card-badge"]}>{pkg.badge}</div>
            
            <div className={styles["card-image-wrapper"]}>
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className={styles["card-image"]} 
              />
              <div className={styles["image-overlay"]}></div>
            </div>

            <div className={styles["card-content"]}>
              <div className={styles["card-header"]}>
                <h3 className={styles["card-title"]}>
                  {pkg.title}
                  {(pkg.title === "Cottage Stay" || pkg.title === "Dome Stay") && (
                    <span className={styles["coming-soon-tag"]}>Coming Soon</span>
                  )}
                </h3>
                <div className={styles["price-tag"]}>
                  <span className={styles.price}>{pkg.price}</span>
                  <span className={styles["per-person"]}>Per Person</span>
                </div>
              </div>

              <p className={styles["card-description"]}>{pkg.description}</p>

              <div className={styles["features-preview"]}>
                {pkg.features.map((feature, index) => (
                  <span key={index} className={styles["feature-tag"]}>{feature}</span>
                ))}
              </div>

              <div className={styles["card-actions"]}>
                {pkg.available ? (
                  <button
                    className={styles["book-now-btn"]}
                    onClick={() => handleBookNowClick(pkg.title)}
                  >
                    <span>Book Now</span>
                    <span className={styles["btn-arrow"]}>→</span>
                  </button>
                ) : (
                  <button className={styles["coming-soon-btn"]} disabled>
                    <span>Coming Soon</span>
                  </button>
                )}
                {pkg.popupKey ? (
                  <button 
                    className={styles["features-btn"]}
                    onClick={() => openpop(pkg.popupKey)}
                  >
                    View Features
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {pop && (
        <div className={styles["feature-modal"]}>
          <div className={styles["modal-overlay"]} onClick={closepop}></div>
          <div className={styles["modal-content"]} data-aos="zoom-in">
            <button className={styles["modal-close"]} onClick={closepop}>
              <span>×</span>
            </button>
            <div className={styles["modal-body"]}>
              <Feature stayType={pop} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;