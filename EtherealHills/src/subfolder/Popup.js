import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css";
import offerr from "../Assets/offerr.webp";

const STORAGE_KEY = "ethereal_popup_shown_v1";
let shownInMemory = false;

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false); // Initially, the popup is hidden

  useEffect(() => {
    try {
      const popupShown = localStorage.getItem(STORAGE_KEY);
      if (!popupShown && !shownInMemory) {
        setShowPopup(true);
      }
    } catch {
      if (!shownInMemory) {
        setShowPopup(true);
      }
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false); // Close the popup when clicking the close button

    shownInMemory = true;
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  };

  return (
    <div>
      {showPopup && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-content"]}>
            <button className={styles["close-button"]} onClick={closePopup}>
              &times;
            </button>
            <img
              src={offerr}
              alt="Offer"
              className={styles["popup-image"]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
