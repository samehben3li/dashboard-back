import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface IProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: IProps): JSX.Element {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
