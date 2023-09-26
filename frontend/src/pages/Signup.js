import React, { useState } from 'react';
import './Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateName = () => {
    if (!formData.name) {
      setErrors({ ...errors, name: 'Name is required' });
    } else {
      setErrors({ ...errors, name: '' });
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      setErrors({ ...errors, email: 'Email is required' });
    } else if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: 'Invalid email format' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const validatePassword = () => {
    if (!formData.password) {
      setErrors({ ...errors, password: 'Password is required' });
    } else {
      setErrors({ ...errors, password: '' });
    }
  };

  const validateConfirmPassword = () => {
    if (!formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Confirm Password is required' });
    } else if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
    } else {
      setErrors({ ...errors, confirmPassword: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions, such as sending data to a server, after validation.
    // For now, we'll just log the form data.
    console.log('Form Data:', formData);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(()=>!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(()=>!confirmPasswordVisibility);
  };


  return (
    <div className="rightLogin">
      <div className="full-screen-container">
        <div className="login-container">
          <h1 className="login-title">Signup</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className={`input-group ${errors.name && 'error'}`}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={validateName}
              />
              {errors.name && <span className="msg">{errors.name}</span>}
            </div>

            <div className={`input-group ${errors.password && 'error'}`}>
              <label htmlFor="password">Password</label>
              <input
                type={passwordVisibility ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePassword}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? 'Hide' : 'Show'}
              </span>
              {errors.password && <span className="msg">{errors.password}</span>}
            </div>

            <div className={`input-group ${errors.confirmPassword && 'error'}`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={confirmPasswordVisibility ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={validateConfirmPassword}
              />
              <span
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisibility ? 'Hide' : 'Show'}
              </span>
              {errors.confirmPassword && (
                <span className="msg">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="login-button">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;