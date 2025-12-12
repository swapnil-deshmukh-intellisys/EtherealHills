import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./package.css";
import img1 from "../Assets/img5.jpg";
import img2 from "../Assets/tent1.jpg";
// import imgD1 from "../Assets/g1.jpeg";
import imgD1 from "../Assets/dome (3).jpg";
import Feature from "./Feature";

const Package = () => {
  const navigate = useNavigate();
  const [pop, setpop] = useState(null);

  const handleBookNowClick = (stayType) => {
    navigate("/package-details", { state: { stayType } }); // Pass stayType to Package2
  };

  const openpop = (type) => {
    setpop(type);
  };

  const closepop = () => {
    setpop(null);
  };

  return (
    <div className="app2">
      <h1 className="heading">Our Packages</h1>
      <div className="card-container">
        {/* Tent Stay Card */}
        <div className="card">
          <div className="card-image-container">
            <img src={img2} alt="Tent Stay" className="card-image" />
          </div>
          <div className="card-content">
            <h2 className="card-title2">Tent Stay</h2>
            <p className="card-price">Starting From ₹1199 Per Person</p>
            <button
              className="add-to-cart"
              onClick={() => handleBookNowClick("Tent Stay")}
            >
              BOOK NOW
            </button>
            <button className="see-features" onClick={() => openpop("Tent")}>
              See Features
            </button>
          </div>
        </div>

        {/* Glam Stay Card */}
        <div className="card">
          <div className="card-image-container">
            <img src={img1} alt="Glam Stay" className="card-image" />
          </div>
          <div className="card-content">
            <h2 className="card-title2">Cottage  Stay</h2>
            <p className="card-price">Starting From ₹1999 Per Person</p>
            <button
              className="add-to-cart disabled-button"
              disabled
            >
              Coming Soon
            </button>
            <button className="see-features" onClick={() => openpop("Cottage")}>
              See Features
            </button>
          </div>
        </div>
        {/* Dome Stay Card */}
        <div className="card">
          <div className="card-image-container">
            <img src={imgD1} alt="Dome Stay" className="card-image" />
          </div>
          <div className="card-content">
            <h2 className="card-title2">Dome Stay</h2>
            <p className="card-price">Starting From ₹2999 Per Person</p>
            <button
              className="add-to-cart disabled-button" 
              disabled
            >
              Coming Soon
            </button>
            <button className="see-features" onClick={() => openpop("Dome")}>
              See Features
            </button>
          </div>
        </div>
      </div>

      {/* pop Section */}
      {pop && (
        <div className="pop">
          <div className="pop-content">
            <button className="close-pop" onClick={closepop}>
              ✖
            </button>
            <Feature stayType={pop} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;
