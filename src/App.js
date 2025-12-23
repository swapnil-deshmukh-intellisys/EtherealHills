import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./subfolder/Login";
import Nav from "./subfolder/Nav";
import ContactUs from "./subfolder/Contactus";
import Signup from "./subfolder/Signup";
import AboutUs from "./subfolder/About";
import HomeP from "./subfolder/HomeP";
import Footer from "./subfolder/Footer";
// import Popup from './subfolder/Popup';
import Package2 from "./subfolder/package2"; // Import Package2
import TentGal from "./subfolder/glam";
import Scroll from "./subfolder/ScrollToTop";
import Policy from "./subfolder/policy";
import Package from "./subfolder/package";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(Boolean(token));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const applyNavbarOffset = () => {
      const navbarEl = document.querySelector(".navbar");
      const navbarHeight = navbarEl ? navbarEl.offsetHeight : 0;
      document.body.style.paddingTop = `${navbarHeight}px`;
      document.documentElement.style.setProperty("--navbar-height", `${navbarHeight}px`);
    };

    applyNavbarOffset();
    window.addEventListener("resize", applyNavbarOffset);
    return () => window.removeEventListener("resize", applyNavbarOffset);
  }, []);

  return (
    <Router>
      <Scroll />
      <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomeP isLoggedIn={isLoggedIn} />} />
        <Route path="/HomeP" element={<HomeP isLoggedIn={isLoggedIn} />} />
        <Route path="/homed" element={<HomeP isLoggedIn={isLoggedIn} />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/create-account" element={<Signup />} />

        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/glam" element={<TentGal />} />

        <Route
          path="/package"
          element={isLoggedIn ? <Package /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/package-details" element={<Package2 />} />{" "}
        <Route path="/policy" element={<Policy />} />
        {/* Add route for Package2 */}
        <Route path="*" element={<HomeP isLoggedIn={isLoggedIn} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
