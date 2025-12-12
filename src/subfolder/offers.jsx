import React from "react";
import "./offers.css";
import campimg from "../Assets/camp.jpg";
import peaceimg from "../Assets/Dj.jpg";
import viewImg from "../Assets/view.jpg";
import bbqimg from "../Assets/bbq.jpg";
import toiletimg from "../Assets/toilet.jpg";
import aroundPuneImg from "../Assets/dome (4).jpg";

const Offers = () => {
  return (
    <div className="app">
      <div className="hero">
        <div className="feature-container">
          <div className="feature">
            <img
              src={campimg}
              alt="Lakeside Location"
              className="feature-img"
            />
            <p>Lakeside Location</p>
          </div>
          <div className="feature">
            <img
              src={peaceimg}
              alt="Peaceful Campsite"
              className="feature-img"
            />
            <p>Live Dj/Music</p>
          </div>
          <div className="feature">
            <img
              src={viewImg}
              alt="Very Close to Lake"
              className="feature-img"
            />
            <p>Very Close to Lake</p>
          </div>
          <div className="feature">
            <img src={bbqimg} alt="BBQ Included" className="feature-img" />
            <p>BBQ Included</p>
          </div>
          <div className="feature">
            <img
              src={toiletimg}
              alt="Western Toilets Available"
              className="feature-img"
            />
            <p>Western Toilets Available</p>
          </div>
          <div className="feature">
            <img
              src={aroundPuneImg}
              alt="Around 50km From Pune"
              className="feature-img"
            />
            <p>Around 50km From Pune</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
