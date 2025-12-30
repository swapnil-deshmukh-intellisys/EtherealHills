import React from 'react';
import { FaCampground } from 'react-icons/fa';
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
              Escape the noise. Breathe the silence. Wake up by the lake.
              In today’s fast-paced world, stress has become a part of everyday life. Endless workdays, screens, and deadlines leave little room to truly unwind. If you’re craving a break that refreshes your mind and soul, Pawna Lake Camping is calling you 🌄
              Nestled near Lonavala, between Pune and Mumbai, Pawna Lake offers the perfect escape into nature. Imagine pitching your tent beside a calm lakeside, watching the sun dip behind the Sahyadri hills, enjoying a warm campfire under a sky full of stars, and waking up to cool morning breezes and birdsong.
            </p>
            <p className={styles["lead-paragraph"]}>
              📍 Easy to reach
              Just 120 km from Mumbai
              Around 65 km from Pune
              Drive down comfortably in your own car
              Or take a train to Lonavala—we’ll arrange a cab for you at a nominal extra cost
              🔥 Why choose our Pawna Lake Camping?
              Scenic lakeside location
              Peaceful, pollution-free environment
              Perfect for couples, friends, families & solo travelers
              Ideal for stress relief, digital detox & quick weekend getaways
              ✨ Don’t just plan a break—experience it.
              Spots fill fast, especially on weekends. Book now and give yourself the nature escape you truly deserve.
            </p>

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