import React from "react";
import styles from "./gallary.module.css";

const Gallery = ({ galleryItems, stayType }) => {
  return (
    <div className={styles.galleryWrapper}>
      <h2 className={styles.galleryTitle}>{stayType} Gallery</h2>
      <div className={styles.galleryGrid}>
        {galleryItems.map((item, index) => (
          <div
            className={[
              styles.galleryItem,
              item.className === "tall" ? styles.tall : "",
              item.className === "wide" ? styles.wide : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={index}
          >
            <img src={item.image} alt={`Gallery ${index}`} className={styles.galleryImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
