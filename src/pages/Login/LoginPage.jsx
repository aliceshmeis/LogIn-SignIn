import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // For notifications
import axios from 'axios';  // For API calls
import { loginSchema } from '../../validation/loginSchema';  // Validation rules
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Buttons/Button';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Form data state (stores username and password)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  // Errors state (stores validation error messages)
  const [errors, setErrors] = useState({});
  
  // Loading state (shows when form is submitting)
  const [isLoading, setIsLoading] = useState(false);

  // This function runs when user types in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;  // Get field name and value
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({//update the erros sate and takes the previous error objects
        ...prev,//Copies all existing fields in formData.
        [name]: ''//Sets the error for this field to an empty string, effectively clearing it.
      }));
    }
  };

  // This function validates the form using Yup
  const validateForm = async () => {
    try {
      // Check if form data matches our validation rules
      await loginSchema.validate(formData, { abortEarly: false });
      return true;  // Validation passed!
    } catch (err) {
      // Validation failed, collect all errors
      const validationErrors = {};
      err.inner.forEach((error) => {//This turns the array into a nice object like:
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;  // Validation failed
    }
  };

  // This function runs when user clicks "Sign In" button
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload

    // Step 1: Validate the form
    const isValid = await validateForm();
    if (!isValid) {
      toast.error('Please fix the errors in the form');  // Show error notification
      return;
    }

    setIsLoading(true);  // Show loading state

    try {
      // Step 2: Make API call to login
      // TODO: Replace with your real API endpoint
      // const response = await axios.post('YOUR_API_URL/login', formData);
      
      // For now, simulate API call (remove this later)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login data:', formData);
      
      // Step 3: Show success message
      toast.success('Sign in successful! 🎉');
      
      // Step 4: Wait a moment, then redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      // If API call fails, show error message
      const errorMessage = error.response?.data?.message || 'Invalid username or password';
      toast.error(errorMessage);
      
      setErrors({
        submit: errorMessage
      });
    } finally {
      setIsLoading(false);  // Hide loading state
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Toast notification container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to continue to your account
          </p>
        </div>

        <Card variant="primary" padding="large" shadow>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username Input */}
            <InputField
              label="Username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              required
            />

            {/* Password Input */}
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {/* Forgot Password Link */}
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            {/* Submit Error (if API fails) */}
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/signup" className={styles.link}>
                Sign Up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;