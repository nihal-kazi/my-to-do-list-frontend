import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';
import Login from './Login';
import Dashboard from './Dashboard';

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element, ...props }) => {
    const { user } = useAuth();
  
    if (user) {
      return <Route {...props} path={path} element={element} />;
    } else {
      return <Navigate to="/login" />;
    }
  };

export default PrivateRoute