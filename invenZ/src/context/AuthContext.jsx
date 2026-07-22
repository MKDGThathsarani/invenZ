// src/context/AuthContext.jsx - AUTO LOGIN + DEMO MODE WITH PASSWORD VALIDATION
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext(null);

// ✅ Demo Users
const DEMO_USERS = [
  { 
    id: 1, 
    name: 'Admin', 
    email: 'admin@invenz.com', 
    password: 'admin123', 
    role: 'Administrator',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=1B5E20&color=fff&bold=true&size=40'
  },
  { 
    id: 2, 
    name: 'Manager', 
    email: 'manager@invenz.com', 
    password: 'manager123', 
    role: 'Manager',
    avatar: 'https://ui-avatars.com/api/?name=Manager&background=2E7D32&color=fff&bold=true&size=40'
  },
  { 
    id: 3, 
    name: 'Staff User', 
    email: 'staff@invenz.com', 
    password: 'staff123', 
    role: 'Staff',
    avatar: 'https://ui-avatars.com/api/?name=Staff&background=4CAF50&color=fff&bold=true&size=40'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Auto Login for Demo
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for saved user in localStorage first
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // ✅ Auto Login for Demo (No Backend needed)
        const demoUser = {
          id: 1,
          name: 'Admin',
          email: 'admin@invenz.com',
          role: 'Administrator',
          avatar: 'https://ui-avatars.com/api/?name=Admin&background=1B5E20&color=fff&bold=true&size=40'
        };
        setUser(demoUser);
        setIsAuthenticated(true);
        localStorage.setItem('auth_user', JSON.stringify(demoUser));
        localStorage.setItem('token', 'demo-token-12345');
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ Login - Demo Mode
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Find user by email and password
      const foundUser = DEMO_USERS.find(u => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('❌ Invalid email or password. Please try again.');
      }
      
      // Create user session
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      localStorage.setItem('token', 'demo-token-12345');
      
      setLoading(false);
      return { data: { user: userData, token: 'demo-token-12345' } };
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register - Demo Mode
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if email already exists
      const existingUser = DEMO_USERS.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('Email already exists. Please login.');
      }
      
      // Create new user
      const newUser = {
        id: DEMO_USERS.length + 1,
        name: userData.name || 'User',
        email: userData.email,
        password: userData.password,
        role: 'Staff',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=4CAF50&color=fff&bold=true&size=40`
      };
      
      DEMO_USERS.push(newUser);
      
      // Login the new user
      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      };
      
      setUser(userSession);
      setIsAuthenticated(true);
      localStorage.setItem('auth_user', JSON.stringify(userSession));
      localStorage.setItem('token', 'demo-token-12345');
      
      setLoading(false);
      return { data: { user: userSession, token: 'demo-token-12345' } };
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');
  };

  // ✅ Update profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      
      // Update DEMO_USERS array
      const userIndex = DEMO_USERS.findIndex(u => u.email === user?.email);
      if (userIndex !== -1) {
        DEMO_USERS[userIndex].name = userData.name || DEMO_USERS[userIndex].name;
      }
      
      setLoading(false);
      return { data: { user: updatedUser } };
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Change Password - UPDATED WITH VALIDATION
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      // Find user in DEMO_USERS array
      const userIndex = DEMO_USERS.findIndex(u => u.email === user?.email);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // ✅ Verify current password
      if (DEMO_USERS[userIndex].password !== currentPassword) {
        throw new Error('❌ Current password is incorrect');
      }
      
      // ✅ Check if new password is same as current
      if (currentPassword === newPassword) {
        throw new Error('❌ New password must be different from current password');
      }
      
      // ✅ Check password length
      if (newPassword.length < 6) {
        throw new Error('❌ New password must be at least 6 characters');
      }
      
      // ✅ Update password in DEMO_USERS
      DEMO_USERS[userIndex].password = newPassword;
      
      // ✅ Log success
      console.log('✅ Password changed successfully for:', user?.email);
      console.log('📝 New password:', newPassword);
      
      setLoading(false);
      return { success: true, message: 'Password changed successfully!' };
    } catch (err) {
      setError(err.message || 'Failed to change password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const foundUser = DEMO_USERS.find(u => u.email === email);
      if (!foundUser) {
        throw new Error('Email not found. Please check your email address.');
      }
      
      setLoading(false);
      return { success: true, message: 'Password reset link sent to your email.' };
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset password
  const resetPassword = async (token, password) => {
    try {
      setLoading(true);
      setError(null);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get current user
  const getCurrentUser = () => user;

  // Check if user has role
  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    hasRole,
    users: DEMO_USERS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;