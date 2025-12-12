import React from "react";
import "./gallary.css"; // Separate CSS for gallery styling

const Gallery = ({ galleryItems, stayType }) => {
  return (
    <div className="gallery-wrapper">
      <h2 className="gallery-title">{stayType} Gallery</h2>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div className={`gallery-item ${item.className || ""}`} key={index}>
            <img src={item.image} alt={`Gallery ${index}`} className="gallery-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
