import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import img1 from '../Assets/camping.jpg';
import img2 from '../Assets/camping2.jpg';
import img3 from '../Assets/night.jpg';
import { getDocs, query, where, collection } from '@firebase/firestore'; // Import Firestore functions
import { firestore } from '../firebase'; // Ensure Firestore instance is imported

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Query Firestore to check if the user exists
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('email', '==', formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        if (user.password === formData.password) {
          alert('Login successful!');
          setIsLoggedIn(true); // Update logged-in state
          navigate('/homed'); // Redirect to home page
        } else {
          alert('Invalid password!');
        }
      } else {
        alert('User not found. Please sign up.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  const images = [img1, img2, img3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="login-container">
      <div className="login-image">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={index === currentIndex ? 'active' : 'inactive'}
          />
        ))}
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <div className="form-group">
            <label htmlFor="email">Contact / Email</label> <br />
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
            <label htmlFor="password">Password</label> <br />
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
          <div className="links">
            <a href="/forgot-password">Forgot password?</a>
            <a onClick={() => navigate('/create-account')} className="create-account-link">
              Create account
            </a>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
