import React from "react";
import "./glam.css";

// Glam Stay images
import img1 from "../Assets/g1.jpeg";
import img2 from "../Assets/glam.jpg";
import img3 from "../Assets/glam2.jpg";
import img4 from "../Assets/tent1.jpg";
import img5 from "../Assets/dome (2).jpg";
import img6 from "../Assets/g6.jpeg";
import img7 from "../Assets/tent5.jpg";
import img8 from "../Assets/book2.jpg";
// Tent images
import tent1 from "../Assets/book1.jpg";
import tent2 from "../Assets/gg1.jpg";
import tent3 from "../Assets/dome (4).jpg";
import tent4 from "../Assets/gg4.jpg";
import tent5 from "../Assets/book3.jpg";
import tent6 from "../Assets/tent5.jpg";

// Array of gallery items for Glam Stay images
const glamGalleryItems = [
  { image: img1, className: "tent-glam-img" },
  { image: img2, className: "tent-glam-img" },
  { image: img7, className: "tent-glam-img" },
  { image: img5, className: "tent-glam-img" },
  { image: img3, className: "tent-glam-img-tall" },
  { image: img4, className: "tent-glam-img-wide" },
  { image: img8, className: "tent-glam-img" },
  { image: img6, className: "tent-glam-img" },
];

// Array of gallery items for Tent Stay images
const tentGalleryItems = [
  { image: tent1, className: "tent-image-card-tall" },
  { image: tent2, className: "tent-image-card-tall" },
  { image: tent6, className: "tent-image-card-tall" },
  { image: tent3, className: "tent-image-card-tall" },
  { image: tent4, className: "tent-image-card-tall" },
  { image: tent5, className: "tent-image-card-tall" },
];

function Gallery() {
  return (
    <div className="tent-main-div-gallery">
      <section id="tent-gallery" className="tent-modern-gallery">
        <h1>Gallery</h1>
        <p>Experience the beauty through our lens.</p>

        {/* Glam Stay Images */}
        <div className="tent-grid">
          {glamGalleryItems.map((item, index) => (
            <div key={index} className={`tent-gallery-img ${item.className}`}>
              <img src={item.image} alt={`Glam Stay Image ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Tent Stay Images */}
        <div className="tent-gallery-container">
          {tentGalleryItems.map((item, index) => (
            <div key={index} id={`tent-image-${index + 1}`} className={`tent-image-card ${item.className}`}>
              <img src={item.image} alt={`Tent Stay Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Gallery;
