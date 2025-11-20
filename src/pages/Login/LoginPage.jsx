import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../components/Buttons/Button';
import Card from '../../components/Card/Card';
import InputField from '../../components/InputField/InputField';
import { login } from '../../apis/authApi';
import styles from './LoginPage.module.scss';
import * as Yup from 'yup';

// Validation schema
export const loginSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    const trimmedData = {
      username: data.username.trim(),
      password: data.password.trim()
    };

    setIsLoading(true);

    try {
      const response = await login(trimmedData);

      if (response.errorCode === 0 && response.data) {
        // Store ONLY the token
        localStorage.setItem('token', response.data.token);
        
        // Store user info for UI display (username, isAdmin)
        // Backend will get userId from JWT token automatically
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Sign in successful! 🎉');
        
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
            <InputField
              label="Username"
              type="text"
              name="username"
              placeholder="Enter your username"
              {...register('username')}
              error={errors.username?.message}
              required
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register('password')}
              error={errors.password?.message}
              required
            />

            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

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
