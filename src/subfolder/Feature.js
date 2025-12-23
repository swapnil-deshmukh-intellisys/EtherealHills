import React from "react";
import "./Feature.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDrumstickBite,
  faCoffee,
  faSwimmingPool,
  faUtensils,
  faCouch,
  faBed,
  faPeace,
  faDoorOpen,
  faChair,
  faGamepad,
  faCompactDisc,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const cardsData = {
  Tent: {
    title: "Tent Stay",
    features: [
      { icon: faDrumstickBite, text: "BBQ" },
      { icon: faCoffee, text: "Snacks" },
      { icon: faCoffee, text: "Morning Breakfast" },
      { icon: faGamepad, text: "Gaming: Cricket, Carrom" },
      { icon: faCompactDisc, text: "DJ Floor" },
      { icon: faMusic, text: "Live Music" },
    ],
  },
  Cottage: {
    title: "Cottage Stay",
    features: [
      { icon: faBed, text: "Cottage" },
      { icon: faDoorOpen, text: "Privacy Couple" },
      { icon: faSwimmingPool, text: "Pool Swimming" },
      { icon: faUtensils, text: "Door Step Food" },
      { icon: faCompactDisc, text: "DJ Floor" },
      { icon: faMusic, text: "Live Music" },
    ],
  },
  Dome: {
    title: "Dome Stay",
    features: [
      { icon: faPeace, text: "High Class Treatment" },
      { icon: faCoffee, text: "Snacks" },
      { icon: faPeace, text: "Peaceful View" },
      { icon: faCouch, text: "AC/Non-AC" },
      { icon: faChair, text: "Bed, Sofa, Chair, Attached Bathroom" },
      { icon: faUtensils, text: "Candle Light Dinner" },
    ],
  },
};

const Feature = ({ stayType }) => {
  const { title, features } = cardsData[stayType] || {
   
    features: [],
  };

  return (
    <div className="feature-card">
      <h3>{title}</h3>
      {features.length > 0 && (
        <ul>
          {features.map((feature, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={feature.icon} /> {feature.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Feature;
