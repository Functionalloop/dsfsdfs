import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }: { children?: React.ReactNode }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // For now, all authenticated users can access admin.
  // TODO: Check for admin custom claim via currentUser.getIdTokenResult()
  return <>{children}</>;
}
