import React from 'react';
import styles from './Pac2.module.css';
import Vid1 from '../Assets/Vid1.mp4'; // Correctly import the video file
import Vid2 from '../Assets/Vid2.mp4'; // Correctly import the video file

const Pac2 = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Pawana Lake Camping Package</h2>
      <div className={styles["video-section"]}>
        <div className={styles["video-container"]}>
          <h3 className={styles.subheading}>Camping Highlights</h3>
          <video controls className={styles.video}>
            <source src={Vid1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles["video-container"]}>
          <h3 className={styles.subheading}>Customer Experiences</h3>
          <video controls className={styles.video}>
            <source src={Vid2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Pac2;
