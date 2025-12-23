import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiCheck, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './Signup.module.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const email = formData.email.trim();
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, and numbers';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name.trim(),
          email: formData.email.trim(), 
          password: formData.password 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Signup failed. Please try again.');
      }

      if (data?.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userEmail', formData.email);
      }

      setStatus({ 
        type: 'success', 
        message: 'Account created successfully! Redirecting to login...' 
      });
      
      setFormData({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
      });
      
      setTimeout(() => navigate('/login'), 1500);
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Network error. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Number', met: /\d/.test(formData.password) },
  ];

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <div className={styles.signupHeader}>
          
          <div className={styles.headerContent}>
            <h2>Create Your Account</h2>
            <p>Join our community of nature lovers and adventure seekers</p>
          </div>
        </div>

        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} className={styles.signupForm}>
              {status && (
                <div className={`${styles.statusAlert} ${styles[status.type]}`}>
                  {status.message}
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>
                  <FiUser className={styles.labelIcon} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                  disabled={isSubmitting}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>
                  <FiMail className={styles.labelIcon} />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                  disabled={isSubmitting}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>
                  <FiLock className={styles.labelIcon} />
                  Password *
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                
                <div className={styles.passwordRequirements}>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className={styles.requirementItem}>
                      <span className={`${styles.requirementIcon} ${req.met ? styles.met : ''}`}>
                        {req.met ? <FiCheck /> : '•'}
                      </span>
                      <span className={`${styles.requirementText} ${req.met ? styles.met : ''}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>
                  <FiLock className={styles.labelIcon} />
                  Confirm Password *
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter your password"
                    className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.termsCheckbox}>
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    disabled={isSubmitting}
                  />
                  <span className={styles.checkboxCustom}></span>
                  <span className={styles.termsText}>
                    I agree to the 
                    <Link to="/terms" className={styles.termsLink}> Terms of Service</Link> and 
                    <Link to="/privacy" className={styles.termsLink}> Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <span className={styles.errorText}>{errors.terms}</span>}
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight className={styles.buttonIcon} />
                  </>
                )}
              </button>

              <div className={styles.divider}>
                <span>Already have an account?</span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className={styles.loginButton}
                disabled={isSubmitting}
              >
                Sign In Instead
              </button>

              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;