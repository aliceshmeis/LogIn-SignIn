import RouteWrapper from '../../components/RouteWrapper/RouteWrapper';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button';
import styles from './AdminPage.module.scss';
import { getCurrentUser, logout } from '../../apis/authApi';

const AdminPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <RouteWrapper>
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.welcome}>Welcome, {user?.username}!</p>
        <p className={styles.subtitle}>You are logged in as an Administrator</p>
        
        <Button onClick={handleLogout} variant="danger" size="medium">
          Logout
        </Button>
      </div>
    </div>
    </RouteWrapper>
  );
};

export default AdminPage;