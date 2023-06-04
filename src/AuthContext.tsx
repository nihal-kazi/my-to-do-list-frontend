import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken, getToken, getUser } from './authUtils';

interface User {
  username: string;
}

interface AuthContextData {
  user: User | null | any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (user) {
    //   const decodedToken = decodeToken(token);
      setUser(JSON.parse(user));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const login = (token: string) => {
    const user = getUser();
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
