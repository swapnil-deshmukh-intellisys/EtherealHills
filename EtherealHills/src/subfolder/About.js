import React from "react";
import { useNavigate } from 'react-router-dom';
import ss1 from "../Assets/s1.jpeg";
import { 
  ArrowRight, 
  Globe, 
  Shield, 
  Heart, 
  Trees,
  Target,
  Sparkles,
  Star,
  MapPin,
  Users,
  Award,
  Calendar
} from 'lucide-react';
import styles from "./About.module.css";
import aboutbg from "../Assets/aboutbg.jpg";

const Aboutus = () => {
  const navigate = useNavigate();
  
  const values = [
    {
      icon: <Globe />,
      title: "Sustainable Tourism",
      description: "We prioritize eco-friendly practices to preserve Pawna Lake's natural beauty for generations."
    },
    {
      icon: <Shield />,
      title: "Safety First",
      description: "Your safety is our top priority with 24/7 security and emergency response systems."
    },
    {
      icon: <Heart />,
      title: "Exceptional Hospitality",
      description: "Personalized service and attention to detail to make your stay memorable."
    },
    {
      icon: <Trees />,
      title: "Nature Immersion",
      description: "Designed to connect you with nature while providing modern comforts."
    }
  ];

  // const stats = [
  //   { number: "5000+", label: "Happy Campers", icon: <Users /> },
  //   { number: "98%", label: "Satisfaction Rate", icon: <Star /> },
  //   { number: "50+", label: "Awards & Recognition", icon: <Award /> },
  //   { number: "7", label: "Years of Excellence", icon: <Calendar /> }
  // ];

  return (
    <div className={styles["about-page"]}>
      {/* Hero Section */}
      <section className={styles["about-hero"]}>
        <div className={styles["hero-overlay"]}>
          {/* <span className={styles["hero-badge"]}>
            <Sparkles /> Premium Lakeside Retreat
          </span> */}
          <h1 className={styles["hero-title"]}>
            Where Luxury Meets <br /> Wilderness
          </h1>
          <p className={styles["hero-subtitle"]}>
            Experience the perfect blend of outdoor adventure and premium comfort 
            at Pawna Lake's most exclusive camping destination
          </p>
          <div className={styles["hero-actions"]}>
            <button 
              onClick={() => navigate('/contact')} 
              className={styles["hero-btn"]}
            >
              Book Your Stay <ArrowRight className={styles["btn-icon"]} />
            </button>
            <button 
              onClick={() => navigate('/home')} 
              className={`${styles["hero-btn"]} ${styles["secondary"]}`}
            >
              Explore Home
            </button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles["story-section"]}>
        <div className={styles.container}>
          <div className={styles["story-content"]}>
            <div className={styles["story-text"]}>
              <h2 className={styles["section-title"]}>
                Crafting Unforgettable <br /> Lakeside Memories
              </h2>
              <p className={styles["story-description"]}>
                Escape the noise and reconnect with nature—without giving up comfort.
                Ethereal Hills brings luxury glamping to Pawna Lake with breathtaking views,
                curated experiences, and a peaceful atmosphere.
              </p>
              <p className={styles["story-description"]}>
                Strategic Location: Perfectly situated at Pawna Lake between Mumbai and Pune.
                Easy Access: 120km from Mumbai, 65km from Pune, with transportation assistance.
                Premium Amenities: Luxury camping with modern comforts in nature's lap.
              </p>
              
              {/* Stats */}
              {/* <div className={styles["stats-grid"]}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles["stat-item"]}>
                    <div className={styles["stat-icon"]}>{stat.icon}</div>
                    <div className={styles["stat-number"]}>{stat.number}</div>
                    <div className={styles["stat-label"]}>{stat.label}</div>
                  </div>
                ))}
              </div> */}
            </div>
            
            <div className={styles["story-image"]}>
              <img src= {ss1} alt="Luxury Camping at Pawna Lake" />
              <div className={styles["image-overlay"]}></div>
              {/* <div className={styles["image-badge"]}>
                <Target /> Est. 2017
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles["values-section"]}>
        <div className={styles.container}>
          <div className={styles["section-header"]}>
            {/* <h2 className={styles["section-title"]}>Core Values</h2> */}
            <p className={styles["section-subtitle"]}>
              Guiding principles that shape every aspect of your experience
            </p>
          </div>
          
          <div className={styles["values-grid"]}>
            {values.map((value, index) => (
              <div key={index} className={styles["value-card"]}>
                <div className={styles["value-icon"]}>{value.icon}</div>
                <h3 className={styles["value-title"]}>{value.title}</h3>
                <p className={styles["value-description"]}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {/* <section className={styles["mission-section"]}>
        <div className={styles["mission-overlay"]}>
          <div className={styles.container}>
            <div className={styles["mission-content"]}>
              <span className={styles["section-label"]}>Our Purpose</span>
              <h2 className={styles["mission-title"]}>Vision & Mission</h2>
              <p className={styles["mission-text"]}>
                To revolutionize outdoor hospitality by creating sustainable, 
                immersive experiences that connect people with nature while 
                setting new standards for comfort and service in wilderness settings.
              </p>
              
              <div className={styles["mission-features"]}>
                <div className={styles["feature-item"]}>
                  <MapPin className={styles["feature-icon"]} />
                  <span>Prime Lakeside Location</span>
                </div>
                <div className={styles["feature-item"]}>
                  <Shield className={styles["feature-icon"]} />
                  <span>24/7 Security & Safety</span>
                </div>
                <div className={styles["feature-item"]}>
                  <Heart className={styles["feature-icon"]} />
                  <span>Personalized Experiences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

     
    </div>
  );
};

export default Aboutus;