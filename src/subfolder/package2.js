import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./package.css";
import Gallery from "./gallary";
import Book from "./book";

// Import images for Tent Stay, Glam Stay, and Dome Stay
import img1 from "../Assets/img5.jpg";
import img2 from "../Assets/tent1.jpg";
import img3 from "../Assets/tent3.jpg";
import img4 from "../Assets/tent4.jpg";
import img5 from "../Assets/tent5.jpg";

import img11 from "../Assets/g7.jpeg";
import img22 from "../Assets/g2.jpeg";
import img33 from "../Assets/g3.jpeg";
import img44 from "../Assets/gg1.jpg";
import img55 from "../Assets/g6.jpeg";

import imgD1 from "../Assets/dome (2).jpg";
import imgD2 from "../Assets/dome (3).jpg";
import imgD3 from "../Assets/dome (4).jpg";
import imgD4 from "../Assets/dome (5).webp";
import imgD5 from "../Assets/dome (1).png";


const galleries = {
  "Tent Stay": [
    { image: img1, className: "" },
    { image: img2, className: "" },
    { image: img3, className: "tall" },
    { image: img4, className: "wide" },
    { image: img5, className: "" },
  ],
  "Cottage Stay": [
    { image: img11, stayType: "Glam Stay" },
    { image: img22, stayType: "Glam Stay" },
    { image: img33, stayType: "Glam Stay" },
    { image: img44, stayType: "Glam Stay" },
    { image: img55, stayType: "Glam Stay" },
  ],
  "Dome Stay": [
    { image: imgD1, stayType: "Dome Stay" },
    { image: imgD2, stayType: "Dome Stay" },
    { image: imgD3, stayType: "Dome Stay" },
    { image: imgD4, stayType: "Dome Stay" },
    { image: imgD5, stayType: "Dome Stay" },
    
  ],
};

function Package2() {
  const location = useLocation();
  const { stayType } = location.state || {};

  const gallery = stayType ? galleries[stayType] : [];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfGuests: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., API call or state update
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="package-details">
      <h1 className="heading">Package Details</h1>
      {stayType ? (
        <>
          
          
          
          <Book stayType={stayType} />

          <div className="gallery-container">
            <Gallery galleryItems={gallery} stayType={stayType} />
          </div>
        </>
      ) : (
        <p className="error-message">No package selected. Please go back and choose a package.</p>
      )}
    </div>
  );
}

export default Package2;
