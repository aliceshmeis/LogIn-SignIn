import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // NEW
import { yupResolver } from '@hookform/resolvers/yup'; // NEW
import { toast, ToastContainer } from 'react-toastify';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Buttons/Button';
import { signup } from '../../apis/authApi';
import styles from './SignUpPage.module.scss';
import * as Yup from 'yup';

export const signupSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  
  // RECOMMENDED: Balanced email validation
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|co|io|uk|ca|de|fr|au|jp|in|br)$/i,
      'Email must end with a valid domain like .com, .net, .org, etc.'
    ),
  
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Setup React Hook Form with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange' // Show errors as user types
  });

  // Handle form submission
  const onSubmit = async (data) => {
    // Trim spaces from all inputs
    const trimmedData = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim()
    };

    setIsLoading(true);

    try {
      // Call backend API
      const response = await signup(trimmedData);
      
      // Check if signup was successful
      if (response.errorCode === 0) {
        toast.success('Account created successfully! 🎉');
        
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else if (response.errorCode === 409) {
        toast.error('Username or email already exists');
      } else {
        toast.error(response.message || 'Something went wrong');
      }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signUpPage}>
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
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Username Input */}
            <InputField
              label="Username"
              type="text"
              name="username"
              placeholder="Choose a username"
              {...register('username')} // Register with React Hook Form
              error={errors.username?.message} // Show error from Yup
              required
            />

            {/* Email Input */}
            <InputField
              label="Email Address"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              {...register('email')} // Register with React Hook Form
              error={errors.email?.message} // Show error
              required
            />

            {/* Password Input */}
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              {...register('password')} // Register with React Hook Form
              error={errors.password?.message} // Show error
              required
            />

            {/* Confirm Password Input */}
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              {...register('confirmPassword')} // Register with React Hook Form
              error={errors.confirmPassword?.message} // Show error
              required
            />

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