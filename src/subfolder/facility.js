import React, { useEffect, useState } from "react";
import styles from "./facility.module.css";
import tentImage from "../Assets/tent.jpg";
import bonfireImage from "../Assets/bonfire.jpg";
import foodImage from "../Assets/food.jpg";
import Dj from "../Assets/Dj.jpg";
import Swimming from "../Assets/Swimming.jpg";
import Games1 from "../Assets/Games1.jpg";
import Games2 from "../Assets/Games2.jpg";
import Games3 from "../Assets/Games3.jpg";
import Games4 from "../Assets/Games4.jpg";
import Games5 from "../Assets/Games5.jpg";
import scheduleMapImage from "../Assets/schedule-map.jpg";

const Facility = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    reviews: 0,
    years: 0,
    followers: 0,
  });

  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const gameImages = [Games1, Games2, Games3, Games4, Games5];

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % gameImages.length);
    }, 3000);

    return () => clearInterval(gameInterval);
  }, [gameImages.length]);

  useEffect(() => {
    const totalDuration = 2000;
    const updateInterval = 50;
    const steps = totalDuration / updateInterval;

    const incrementValues = {
      customers: 40000 / steps,
      reviews: 400 / steps,
      years: 5 / steps,
      followers: 100000 / steps,
    };

    const counterInterval = setInterval(() => {
      setCounters((prev) => ({
        customers: Math.min(prev.customers + incrementValues.customers, 40000),
        reviews: Math.min(prev.reviews + incrementValues.reviews, 400),
        years: Math.min(prev.years + incrementValues.years, 5),
        followers: Math.min(prev.followers + incrementValues.followers, 100000),
      }));
    }, updateInterval);

    return () => clearInterval(counterInterval);
  }, []);

  const facilities = [
    {
      id: 1,
      title: "Luxury Tents",
      description: "Premium tents with comfortable bedding, power outlets, and lake views.",
      image: tentImage
    },
    {
      id: 2,
      title: "Bonfire Nights",
      description: "Cozy bonfire setups with seating under the starry sky.",
      image: bonfireImage
    },
    {
      id: 3,
      title: "Gourmet Dining",
      description: "Chef-curated meals with local flavors and BBQ specials.",
      image: foodImage
    },
    {
      id: 4,
      title: "Live Entertainment",
      description: "Professional DJ setup and live music performances.",
      image: Dj
    },
    {
      id: 5,
      title: "Swimming Pool",
      description: "Spacious swimming pool with lounging area.",
      image: Swimming
    },
    {
      id: 6,
      title: "Activities & Games",
      description: "Cricket, archery, badminton, carrom, and more.",
      image: gameImages[currentGameIndex]
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Adventure Enthusiast",
      text: "The lakeside camping experience was beyond amazing! The attention to detail and hospitality made our weekend unforgettable.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Family Traveler",
      text: "Perfect family getaway! Kids loved the games, and we enjoyed the peaceful sunset by the lake. Highly recommended!",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Corporate Group",
      text: "Organized our team outing here. The facilities were excellent, and the activities kept everyone engaged. Great team bonding!",
      rating: 5
    },
    {
      name: "Sneha Reddy",
      role: "Couple Traveler",
      text: "Romantic candlelight dinner by the lake was magical. The dome stay was luxurious with stunning views.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Photographer",
      text: "Photographer's paradise! The lighting during golden hour is perfect for capturing beautiful memories.",
      rating: 5
    },
    {
      name: "Ananya Desai",
      role: "Solo Traveler",
      text: "Felt completely safe and welcome as a solo traveler. Met amazing people and had the best weekend retreat.",
      rating: 5
    }
  ];

  return (
    <div className={styles["facilities-section"]}>
      {/* Facilities Section */}
      <section className={styles["facilities-hero"]}>
        <div className={styles["facilities-header"]}>
          <span className={styles["facilities-badge"]}>Premium Amenities</span>
          <h1 className={styles["facilities-title"]}>World-Class Facilities</h1>
          <p className={styles["facilities-subtitle"]}>
            Experience luxury camping with state-of-the-art amenities designed for your comfort
          </p>
        </div>
      </section>

      <section className={styles["facilities-grid-section"]}>
        <div className={styles["facilities-container"]}>
          {facilities.map((facility) => (
            <div 
              key={facility.id} 
              className={styles["facility-card"]}
              data-aos="fade-up"
            >
              <div className={styles["facility-image-container"]}>
                <img 
                  src={facility.image} 
                  alt={facility.title} 
                  className={styles["facility-image"]} 
                />
                <div className={styles["image-overlay"]}></div>
              </div>
              <div className={styles["facility-content"]}>
                <h3 className={styles["facility-name"]}>{facility.title}</h3>
                <p className={styles["facility-desc"]}>{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Section */}
      <section className={styles["schedule-section"]}>
        <div className={styles["schedule-header"]}>
          <h2 className={styles["schedule-title"]}>Daily Schedule</h2>
          <p className={styles["schedule-subtitle"]}>Perfectly planned activities for an unforgettable experience</p>
        </div>
        <div className={styles["schedule-container"]}>
          <img 
            src={scheduleMapImage} 
            alt="Daily Schedule" 
            className={styles["schedule-image"]} 
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles["stats-section"]}>
        <div className={styles["stats-header"]}>
          <h2 className={styles["stats-title"]}>Our Journey So Far</h2>
          <p className={styles["stats-subtitle"]}>Creating memorable experiences since day one</p>
        </div>
        <div className={styles["stats-grid"]}>
          <div className={styles["stat-card"]}>
            <div className={styles["stat-value"]}>{Math.round(counters.customers)}+</div>
            <div className={styles["stat-label"]}>Happy Customers</div>
          </div>
          <div className={styles["stat-card"]}>
            <div className={styles["stat-value"]}>{Math.round(counters.reviews)}+</div>
            <div className={styles["stat-label"]}>5-Star Reviews</div>
          </div>
          <div className={styles["stat-card"]}>
            <div className={styles["stat-value"]}>{Math.round(counters.years)}+</div>
            <div className={styles["stat-label"]}>Years Experience</div>
          </div>
          <div className={styles["stat-card"]}>
            <div className={styles["stat-value"]}>{Math.round(counters.followers)}+</div>
            <div className={styles["stat-label"]}>Social Followers</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles["testimonials-section"]}>
        <div className={styles["testimonials-header"]}>
          <span className={styles["testimonials-badge"]}>Testimonials</span>
          <h2 className={styles["testimonials-title"]}>Guest Experiences</h2>
          <p className={styles["testimonials-subtitle"]}>Hear what our guests have to say about their stay</p>
        </div>
        <div className={styles["testimonials-grid"]}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={styles["testimonial-card"]}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles["testimonial-rating"]}>
                {"★".repeat(testimonial.rating)}
              </div>
              <p className={styles["testimonial-text"]}>"{testimonial.text}"</p>
              <div className={styles["testimonial-author"]}>
                <div className={styles["author-info"]}>
                  <h4 className={styles["author-name"]}>{testimonial.name}</h4>
                  <p className={styles["author-role"]}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default Facility;