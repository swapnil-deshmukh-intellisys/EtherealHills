import React from 'react';
import './Pac2.css';
import Vid1 from '../Assets/Vid1.mp4'; // Correctly import the video file
import Vid2 from '../Assets/Vid2.mp4'; // Correctly import the video file

const Pac2 = () => {
  return (
    <div className="container">
      <h2 className="heading">Pawana Lake Camping Package</h2>
      <div className="video-section">
        <div className="video-container">
          <h3 className="subheading">Camping Highlights</h3>
          <video controls className="video">
            <source src={Vid1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-container">
          <h3 className="subheading">Customer Experiences</h3>
          <video controls className="video">
            <source src={Vid2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Pac2;
