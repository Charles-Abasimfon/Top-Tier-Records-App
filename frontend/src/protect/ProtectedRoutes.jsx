import { Navigate } from 'react-router-dom';
/* This component serves to protect protected routes to permit only logged in admins/recorders to enter*/
const ProtectedRoute = ({ admin, redirectPath = '/login', children }) => {
  if (!admin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
