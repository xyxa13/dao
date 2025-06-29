import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Global user settings state
  const [userSettings, setUserSettings] = useState({
    displayName: 'Anonymous User',
    email: '',
    bio: '',
    avatar: null,
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      showProfile: true,
      showActivity: false,
      showInvestments: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      loginAlerts: true
    },
    preferences: {
      language: 'en',
      currency: 'USD',
      timezone: 'UTC',
      soundEffects: true,
      animations: true
    }
  });

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const client = await AuthClient.create({
        idleOptions: {
          disableIdle: true,
          disableDefaultIdleCallback: true
        }
      });
      setAuthClient(client);
      
      const authenticated = await client.isAuthenticated();
      if (authenticated) {
        const identity = client.getIdentity();
        const principalId = identity.getPrincipal().toText();
        setPrincipal(principalId);
        setIsAuthenticated(true);
        
        // Load user settings from localStorage or API
        const savedSettings = localStorage.getItem(`userSettings_${principalId}`);
        if (savedSettings) {
          setUserSettings(JSON.parse(savedSettings));
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    if (!authClient) {
      console.error('Auth client not initialized');
      throw new Error('Auth client not initialized');
    }
    
    try {
      const APP_NAME = "DAOVerse";
      const APP_LOGO = "https://via.placeholder.com/150x150/6366f1/ffffff?text=DAO";
      const MAX_TIME_TO_LIVE = BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000); // 7 days in nanoseconds
      
      return new Promise((resolve, reject) => {
        authClient.login({
          identityProvider: import.meta.env.VITE_DFX_NETWORK === "local" 
            ? `http://localhost:4943/?canisterId=${import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY}` 
            : "https://identity.ic0.app",
          maxTimeToLive: MAX_TIME_TO_LIVE,
          windowOpenerFeatures: "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
          onSuccess: async () => {
            try {
              const identity = authClient.getIdentity();
              const principalId = identity.getPrincipal().toText();
              setPrincipal(principalId);
              setIsAuthenticated(true);
              
              // Load user settings for this principal
              const savedSettings = localStorage.getItem(`userSettings_${principalId}`);
              if (savedSettings) {
                setUserSettings(JSON.parse(savedSettings));
              }
              
              resolve();
            } catch (error) {
              console.error('Error after successful login:', error);
              reject(error);
            }
          },
          onError: (error) => {
            console.error('Login failed:', error);
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!authClient) return;
    
    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
      // Reset user settings to default
      setUserSettings({
        displayName: 'Anonymous User',
        email: '',
        bio: '',
        avatar: null,
        theme: 'dark',
        notifications: {
          email: true,
          push: true,
          sms: false,
          marketing: false
        },
        privacy: {
          showProfile: true,
          showActivity: false,
          showInvestments: false
        },
        security: {
          twoFactor: false,
          sessionTimeout: 30,
          loginAlerts: true
        },
        preferences: {
          language: 'en',
          currency: 'USD',
          timezone: 'UTC',
          soundEffects: true,
          animations: true
        }
      });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  // Function to update user settings globally
  const updateUserSettings = (newSettings) => {
    setUserSettings(newSettings);
    // Save to localStorage
    if (principal) {
      localStorage.setItem(`userSettings_${principal}`, JSON.stringify(newSettings));
    }
  };

  const value = {
    isAuthenticated,
    principal,
    login,
    logout,
    loading,
    userSettings,
    updateUserSettings
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};