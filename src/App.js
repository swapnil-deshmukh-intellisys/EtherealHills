import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./subfolder/Login";
import Nav from "./subfolder/Nav";
import Navbar from "./subfolder/navbar";
import ContactUs from "./subfolder/Contactus";
import Signup from "./subfolder/Signup";
import AboutUs from "./subfolder/About";
import HomeP from "./subfolder/HomeP";
import Footer from "./subfolder/Footer";
import Homed from "./subfolder/Homed";
// import Popup from './subfolder/Popup';
import Package2 from "./subfolder/package2"; // Import Package2
import TentGal from "./subfolder/glam";
import GlamGal from "./subfolder/glamG";
import Scroll from "./subfolder/ScrollToTop";
import Policy from "./subfolder/policy";
import Package from "./subfolder/package";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const navbarHeight = document.querySelector(".nav-navbar").offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
  }, []);

  return (
    <Router>
      <Scroll />
      {/* Conditionally render Nav or Navbar */}
      {isLoggedIn ? <Navbar /> : <Nav />}

      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<HomeP />} /> {/* Public Home */}
            
            {/* Additional route for HomeP */}
            <Route path="/HomeP" element={<HomeP />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />{" "}
            {/* Login Page */}
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/create-account" element={<Signup />} />
            <Route path="/glam" element={<TentGal />} />
            <Route path="/glamG" element={<GlamGal />} />
          </>
        ) : (
          <>
            <Route path="/homed" element={<Homed />} /> {/* Private Home */}
            <Route path="/package" element={<Package />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/glam" element={<TentGal />} />
            <Route path="/glamG" element={<GlamGal />} />
          </>
        )}
        <Route path="/package-details" element={<Package2 />} />{" "}
        <Route path="/policy" element={<Policy />} />
        {/* Add route for Package2 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
