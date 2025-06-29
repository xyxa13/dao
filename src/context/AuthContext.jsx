import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on component mount
  useEffect(() => {
    // Check if user was previously authenticated (e.g., from localStorage)
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedPrincipal = localStorage.getItem('principal');
    
    if (savedAuth === 'true' && savedPrincipal) {
      setIsAuthenticated(true);
      setPrincipal(savedPrincipal);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (principalId) => {
    try {
      setIsAuthenticated(true);
      setPrincipal(principalId);
      
      // Persist auth state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('principal', principalId);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setPrincipal(null);
    
    // Clear persisted auth state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('principal');
  };

  // Auth context value
  const value = {
    isAuthenticated,
    principal,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;