import React from 'react';
import { FaCampground, FaMapMarkerAlt, FaRoad, FaStar } from 'react-icons/fa';
import styles from './welcome.module.css';
// import pawana from '../Assets/AsideImage.webp';
import InstagramReel from './InstagramReel';

const WelcomePage = () => {
  return (
    <div className={styles["welcome-container"]}>
      <div className={styles["welcome-header"]}>
        <div className={styles["header-content"]}>
          <span className={styles["header-tag"]}>Experience Luxury in Nature</span>
          <h1 className={styles["welcome-title"]}>
            Welcome to <span className={styles["title-highlight"]}>Ethereal Hills</span>
          </h1>
          <div className={styles["header-divider"]}>
            <div className={styles["divider-line"]}></div>
            <div className={styles["divider-icon"]}><FaCampground aria-hidden="true" /></div>
            <div className={styles["divider-line"]}></div>
          </div>
        </div>
      </div>

      <div className={styles["welcome-content"]}>
        {/* <div className={styles["content-left"]}>
          <div className={styles["image-wrapper"]}>
            <img 
              src={pawana}
              alt="Luxury camping at Pawna Lake"
              className={styles["welcome-image"]}
            />
            <div className={styles["image-overlay"]}>
              <div className={styles["overlay-content"]}>
                <span className={styles["overlay-badge"]}>Premium Experience</span>
                <h3>Pawna Lake Retreat</h3>
              </div>
            </div>
          </div>
        </div> */}
        <div className={styles["content-left"]}>
          <div className={styles["reel-item"]}>
            <InstagramReel permalink="https://www.instagram.com/reel/DSmo9HFAos4/" />
          </div>
          <div className={styles["reel-item"]}>
            <InstagramReel permalink="https://www.instagram.com/reel/DSc4l0LCZmS/" />
          </div>
        </div>

        <div className={styles["content-right"]}>
          <div className={styles["text-content"]}>
            <p className={styles["lead-paragraph"]}>
              Escape the noise and reconnect with nature—without giving up comfort.
              Ethereal Hills brings luxury glamping to Pawna Lake with breathtaking views,
              curated experiences, and a peaceful atmosphere.
            </p>
            <div className={styles["features-grid"]}>
              <div className={styles["feature-item"]}>
                <div className={styles["feature-icon"]}>
                  <FaMapMarkerAlt aria-hidden="true" />
                </div>
                <div className={styles["feature-text"]}>
                  <p><strong>Strategic Location:</strong> Perfectly situated at Pawna Lake between Mumbai and Pune</p>
                </div>
              </div>
              
              <div className={styles["feature-item"]}>
                <div className={styles["feature-icon"]}>
                  <FaRoad aria-hidden="true" />
                </div>
                <div className={styles["feature-text"]}>
                  <p><strong>Easy Access:</strong> 120km from Mumbai, 65km from Pune, with transportation assistance</p>
                </div>
              </div>
              
              <div className={styles["feature-item"]}>
                <div className={styles["feature-icon"]}>
                  <FaStar aria-hidden="true" />
                </div>
                <div className={styles["feature-text"]}>
                  <p><strong>Premium Amenities:</strong> Luxury camping with modern comforts in nature's lap</p>
                </div>
              </div>
            </div>

            {/* <div className={styles["description"]}>
              <p>
                We've crafted an exclusive glamping experience at Pawna Lake near Lonavala. 
                Our luxury campsites offer the perfect blend of nature's serenity and modern 
                amenities. Whether you arrive by car or prefer our arranged transportation 
                from Lonavala station, your journey to tranquility begins here.
              </p>
              
              <div className={styles["cta-section"]}>
                <button className={styles["discover-btn"]}>
                  Discover More
                  <span className={styles["btn-arrow"]}>→</span>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;