import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Get user info
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      {/* Left: Logo + Name */}
      <div className={styles.logo}>
        🛒 OrderService
      </div>

      {/* Center: Links */}
      <div className={styles.links}>
        <Link to="/user/orders">My Orders</Link>
        <Link to="/admin/users">View Users</Link>
        <Link to="/admin/products">Create Products</Link>
        <Link to="/user/products">Create Orders</Link>
        
      </div>

      {/* Right: User Avatar */}
      <div className={styles.userMenu}>
        <div 
          className={styles.avatar}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        {/* Dropdown (shows when I click) */}
        {showDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.userName}>
              {user?.username}
            </div>
            <div 
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;