import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './Login.module.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://etherealhills.onrender.com/api';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Invalid email or password');
      }

      if (data?.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', formData.email);
      }

      setIsLoggedIn(true);
      navigate('/HomeP', { replace: true });
      
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <div className={styles.logo}>
            <div className={styles.logoText}>
              <h2>Ethereal Hills</h2>
              <p>Camping & Glamping</p>
            </div>
          </div>
          <h1 className={styles.formTitle}>Welcome Back</h1>
          <p className={styles.formSubtitle}>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {errors.submit && (
            <div className={styles.errorAlert}>
              {errors.submit}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>
              <FiMail className={styles.labelIcon} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
              disabled={isLoading}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>
              <FiLock className={styles.labelIcon} />
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" disabled={isLoading} />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <FiArrowRight className={styles.buttonIcon} />
              </>
            )}
          </button>

          <div className={styles.divider}>
            <span>Don't have an account?</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/create-account')}
            className={styles.createAccountButton}
            disabled={isLoading}
          >
            Create New Account
          </button>

          <div className={styles.terms}>
            By signing in, you agree to our 
            <Link to="/terms"> Terms of Service</Link> and 
            <Link to="/privacy"> Privacy Policy</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;