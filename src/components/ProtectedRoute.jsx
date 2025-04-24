import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the useUser hook

const ProtectedRoute = ({ element }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return element; // Show the requested element if logged in
};

export default ProtectedRoute;
