import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username, password) => {
    const { data } = await axios.post('https://sugarytestapi.azurewebsites.net/AdminAccount/Login', {
      UserName: username,
      Password: password,
    });
    
    
    if (data?.Success) {
      setUser(data.User);
      setToken(data.Token);
      setRefreshToken(data.RefreshToken);
      localStorage.setItem('user', JSON.stringify(data.User));
      localStorage.setItem('token', data.Token);
      localStorage.setItem('refreshToken', data.RefreshToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.clear();
  };

  const value = {
    user,
    token,
    refreshToken,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);