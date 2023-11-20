import { Navigate } from 'react-router-dom';
import { ProtectedLayout } from './ProtectedLayout';

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    return <Navigate to={'/login'} replace />;
  }

  return <ProtectedLayout />;
};
