import Navbar from './Navbar';
import Footer from './Footer'; // Import Footer
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Page content in the middle */}
      <main className={styles.content}>
        {children}
      </main>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;