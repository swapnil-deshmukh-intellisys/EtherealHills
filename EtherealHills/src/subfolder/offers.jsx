import React from "react";
import styles from "./offers.module.css";
import campimg from "../Assets/camp.jpg";
import peaceimg from "../Assets/Dj.jpg";
import viewImg from "../Assets/view.jpg";
import bbqimg from "../Assets/bbq.jpg";
import toiletimg from "../Assets/toilet.jpg";
import aroundPuneImg from "../Assets/dome (4).jpg";

const Offers = () => {
  const features = [
    {
      image: campimg,
      title: "Lakeside View",
      description: "Premium waterfront camping with panoramic lake views"
    },
    {
      image: peaceimg,
      title: "Live DJ & Music",
      description: "Curated music experience under the stars"
    },
    {
      image: viewImg,
      title: "Lake Access",
      description: "Direct access to pristine Pawna Lake waters"
    },
    {
      image: bbqimg,
      title: "Gourmet BBQ",
      description: "Premium barbecue with chef-curated menu"
    },
    {
      image: toiletimg,
      title: "Luxury Facilities",
      description: "Modern amenities with western conveniences"
    },
    {
      image: aroundPuneImg,
      title: "Prime Location",
      description: "Just 50km from Pune, accessible yet secluded"
    }
  ];

  return (
    <div className={styles["offers-section"]}>
      

      <div className={styles["offers-grid"]}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={styles["offer-card"]}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className={styles["image-container"]}>
              <img 
                src={feature.image} 
                alt={feature.title}
                className={styles["offer-image"]}
              />
              <div className={styles["image-gradient"]}></div>
            </div>
            
            <div className={styles["card-content"]}>
              <h3 className={styles["card-title"]}>{feature.title}</h3>
              <p className={styles["card-description"]}>{feature.description}</p>
            </div>
            
            <div className={styles["card-hover"]}>
            
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Offers;