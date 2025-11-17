import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { signupSchema } from '../../validation/signupSchema';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Buttons/Button';
import styles from './SignUpPage.module.scss';
import { signup } from '../../apis/authApi';

const SignUpPage = () => {
  const navigate = useNavigate();
  
  // Form data state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Errors state
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form using Yup
  const validateForm = async () => {
    try {
      await signupSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate form
  const isValid = await validateForm();
  if (!isValid) {
    toast.error('Please fix the errors in the form');
    return;
  }

  setIsLoading(true);

  try {
    // Call real backend API
    const response = await signup(formData);
    
    // Check if signup was successful
    if (response.errorCode === 0) {
      // Show success message
      toast.success('Account created successfully! 🎉');
      
      // Redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else if (response.errorCode === 409) {
      // User already exists
      toast.error('Username or email already exists');
      setErrors({ submit: 'Username or email already exists' });
    } else {
      // Other error
      toast.error(response.message || 'Something went wrong');
      setErrors({ submit: response.message || 'Something went wrong' });
    }
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
    toast.error(errorMessage);
    
    setErrors({
      submit: errorMessage
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className={styles.signUpPage}>
      {/* Toast notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>
            Join us today and start your journey
          </p>
        </div>

        <Card variant="primary" padding="large" shadow>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username Input */}
            <InputField
              label="Username"
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              required
            />

            {/* Email Input */}
            <InputField
              label="Email Address"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            {/* Password Input */}
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {/* Confirm Password Input */}
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            {/* Submit Error */}
            {errors.submit && (
              <div className={styles.errorBox}>
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          {/* Login Link */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.link}>
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;