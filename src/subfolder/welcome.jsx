import React from 'react';
import './welcome.css'; // Optional: For custom styling
import pawana from '../Assets/AsideImage.webp';

const WelcomePage = () => {
  return (
    <div className="welcome-page-container">
      <header className="welcome-page-header">
        <h1>Welcome to Camp Explorer</h1>
      </header>

      <div className="welcome-page-content">
        <div className="img-container">
        <img src={pawana}
        
           // Replace with a camping-related image URL
          alt="Beautiful campsite"
          className="welcome-page-image"
        />
        </div>
        <div className="para-container">
        <p>
        Today everyone is working day and night to earn money, so everyone is living a stressful life. So if you are looking for different tourist destinations to relieve your stress, then you are on the right website. Because we have specially arranged camping for you at Pawna Lake near Lonavala between Pune and Mumbai. Pawna Lake Camping is 120 km from Mumbai and about 65 km from Pune. You can reach Pawana Camping by your own car. If you do not have a car, you can reach Lonavala by train. From there we can arrange a car for you at an additional cost.
        </p>
        </div>
      </div>

    
    </div>
    
  );
};

export default WelcomePage;