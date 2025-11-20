import { Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout'; 

const RouteWrapper = ({ children }) => {
  // Check if user has token
  const token = localStorage.getItem('token');

  // if theres no token Redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if theres a token Show the page that conatin the layout 
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default RouteWrapper;