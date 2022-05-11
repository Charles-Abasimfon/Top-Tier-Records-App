import { Navigate } from 'react-router-dom';
/* This special protect component prevents recorders or moderators from viewing certain pages -- It restricts this functionality to only actual Administrators */
const PreventNonAdministrators = ({
  admin,
  redirectPath = '/login',
  children,
}) => {
  if (!admin) {
    return <Navigate to={redirectPath} replace />;
  }

  if (admin.admin_level !== 'Administrator') {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default PreventNonAdministrators;
