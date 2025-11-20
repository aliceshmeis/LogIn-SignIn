import RouteWrapper from '../../components/RouteWrapper/RouteWrapper';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import styles from './UserPage.module.scss';
import { getCurrentUser, logout } from '../../apis/authApi';

const UserPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <RouteWrapper>
    <div className={styles.userPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>User Dashboard</h1>
        <p className={styles.welcome}>Welcome, {user?.username}!</p>
        
        <Button onClick={handleLogout} >
          Logout
        </Button>
      </div>
    </div>
    </RouteWrapper>
  );
};

export default UserPage;