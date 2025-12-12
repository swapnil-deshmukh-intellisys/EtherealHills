import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import google from '../Assets/google.png';
import facebook from '../Assets/logo (2).png';
import img from '../Assets/camping.jpg'; // Replace with your image path
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore"; // Import Firestore functions

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const usersRef = collection(firestore, "users"); // Firestore reference to the "users" collection

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Signup successful:', formData);

      // Save formData to Firestore instead of localStorage
      try {
        await addDoc(usersRef, { email: formData.email, password: formData.password }); // Save to Firestore
        console.log('User data saved to Firestore!');
        alert('Signup successful!');
        navigate('/'); // Redirect to the login page or any other route
      } catch (e) {
        console.error('Error saving user data to Firestore:', e);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={img} alt="Camping" />
      </div>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          
          <div className="signup-with">
            <button type="button" className="facebook-signup">
              <img src={facebook} alt="" /> Sign Up with Facebook
            </button>
            <button type="button" className="google-signup">
              <img src={google} alt="" /> Sign Up with Google
            </button>
          </div>

          <hr />

          <div className="form-group">
            <label htmlFor="email">Contact/Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Re-enter Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="signup-button">Sign Up</button>

          <div className="go-to-login-container">
            <a onClick={() => navigate('/login')} className="link-to-login-page"> 
              <span>Already have an account?</span> <br /><span>Go to Login Page</span>
            </a>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
