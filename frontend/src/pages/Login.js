import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(()=>!passwordVisibility);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions, such as sending data to a server, after validation.
    // For now, we'll just log the form data.
    console.log('Form Data:', formData);
  };

  return (
    <div className="rightLogin">
      <div className="full-screen-container">
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className={`input-group ${errors.email && 'error'}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
              />
              {errors.email && <span className="msg">{errors.email}</span>}
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

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
