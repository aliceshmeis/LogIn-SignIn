import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // For notifications
import Button from '../../components/Buttons/Button';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import { login } from '../../apis/authApi';
import { loginSchema } from '../../validation/loginSchema'; // Validation rules
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
    const response = await login({
      username: formData.username,
      password: formData.password
    });

    // Check if login was successful
    if (response.errorCode === 0 && response.data) {
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Show success message
      toast.success('Sign in successful! 🎉');
      
      // Redirect based on role
      setTimeout(() => {
        if (response.data.user.isAdmin) {
          navigate('/admin'); // Admin page
        } else {
          navigate('/user'); // User page
        }
      }, 1500);
    } else {
      // Login failed
      toast.error(response.message || 'Invalid username or password');
    }
    
  } catch (error) {
    // Handle error
    const errorMessage = error.response?.data?.message || 'Invalid username or password';
    toast.error(errorMessage);
    
    setErrors({
      submit: errorMessage
    });
  } finally {
    setIsLoading(false);
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
            <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/signup" className={styles.link}>
                Sign Up
              </Link>
            </p>
          </div>
          </form>

          {/* Sign Up Link */}
          
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;