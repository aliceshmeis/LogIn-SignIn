import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // NEW
import { yupResolver } from '@hookform/resolvers/yup'; // NEW
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../components/Buttons/Button';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import { login } from '../../apis/authApi';
import styles from './LoginPage.module.scss';
import * as Yup from 'yup';

// Validation rules for login form
export const loginSchema = Yup.object({ //the form data should be object with specific feilds
  // Username rules
  username: Yup.string()
    .required('Username is required')           // Must not be empty
    .min(3, 'Username must be at least 3 characters'),  // Minimum length
  
  // Password rules
  password: Yup.string()
    .required('Password is required')           // Must not be empty
    .min(6, 'Password must be at least 6 characters'),  // Minimum length
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Setup React Hook Form with Yup validation
  const {
    register,//connects input to the form
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),//tell my form to use yup schema everytime i submit
    mode: 'onChange' // Show errors as user types//validates while typing
  });

  // Handle form submission
  const onSubmit = async (data) => {
    // Trim spaces from inputs
    const trimmedData = {
      username: data.username.trim(),
      password: data.password.trim()
    };

    setIsLoading(true);

    try {
      // Call backend API
      const response = await login(trimmedData);

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
            navigate('/admin');
          } else {
            navigate('/user');
          }
        }, 1500);
      } else {
        toast.error(response.message || 'Invalid username or password');
      }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid username or password';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
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
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Username Input */}
            <InputField
              label="Username"
              type="text"
              name="username"
              placeholder="Enter your username"
              {...register('username')} // Register input with React Hook Form
              error={errors.username?.message} // Show error from Yup
              required
            />

            {/* Password Input */}
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register('password')} // Register input
              error={errors.password?.message} // Show error
              required
            />

            {/* Forgot Password Link */}
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

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
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;