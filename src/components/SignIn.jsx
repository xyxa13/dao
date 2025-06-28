import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Wallet, Shield, Zap, ArrowRight, Loader2, CheckCircle, AlertCircle, Globe, Lock } from 'lucide-react';

const SignIn = () => {
  const { isAuthenticated, principal, login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await login();
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to connect with Internet Identity. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to logout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Interactive Animated Background with Lighter Particles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        
        {/* Enhanced Floating Particles with Lighter Colors */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 5 === 0 ? 'w-3 h-3 bg-cyan-300/40' :
              i % 5 === 1 ? 'w-2 h-2 bg-purple-300/40' :
              i % 5 === 2 ? 'w-1.5 h-1.5 bg-pink-300/40' :
              i % 5 === 3 ? 'w-2.5 h-2.5 bg-blue-300/40' :
              'w-1 h-1 bg-green-300/40'
            }`}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: Math.random() * 0.6 + 0.1,
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            whileHover={{
              scale: 2,
              opacity: 0.8,
              transition: { duration: 0.3 }
            }}
          />
        ))}

        {/* Interactive Grid Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {[...Array(400)].map((_, i) => (
              <motion.div 
                key={i} 
                className="border border-cyan-500/10"
                whileHover={{
                  backgroundColor: 'rgba(6, 182, 212, 0.05)',
                  transition: { duration: 0.2 }
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Geometric Shapes with Lighter Colors */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${
              i % 3 === 0 ? 'w-8 h-8 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full' :
              i % 3 === 1 ? 'w-6 h-6 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rotate-45' :
              'w-4 h-8 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full'
            }`}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              rotate: 0,
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 40 + 30,
              repeat: Infinity,
              ease: "linear"
            }}
            whileHover={{
              scale: 1.5,
              rotate: 180,
              transition: { duration: 0.5 }
            }}
          />
        ))}

        {/* Pulsing Orbs with Lighter Colors */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/8 to-purple-400/8 backdrop-blur-sm"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0.5,
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 2,
              opacity: 0.8,
              transition: { duration: 0.3 }
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 z-10">
        <motion.div
          className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/30 text-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-3xl"></div>
          
          <div className="relative z-10">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <Shield className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-2 font-mono">
                INTERNET IDENTITY
              </h1>
              <p className="text-cyan-400 text-sm font-mono flex items-center justify-center">
                <Globe className="w-4 h-4 mr-1" />
                > Secure blockchain authentication
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-400 text-sm">{error}</span>
              </motion.div>
            )}

            <AnimatePresence custom={isAuthenticated ? 1 : -1} mode="wait">
              {isAuthenticated ? (
                <motion.div
                  key="authenticated"
                  custom={1}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      </motion.div>
                      <div className="absolute inset-0 bg-green-400/20 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 font-mono">CONNECTION ESTABLISHED!</h2>
                    <p className="text-cyan-400 text-sm mb-4 font-mono">> Identity verified successfully</p>
                    
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 mb-6">
                      <p className="text-xs text-gray-400 mb-1 font-mono">PRINCIPAL ID</p>
                      <code className="text-cyan-400 font-mono text-sm break-all">
                        {principal}
                      </code>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all font-semibold text-white shadow-lg flex items-center justify-center space-x-2 font-mono relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10">ENTER DAOVERSE</span>
                      <ArrowRight className="w-4 h-4 relative z-10" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all font-semibold text-red-300 disabled:opacity-50 font-mono"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          DISCONNECTING...
                        </div>
                      ) : (
                        'DISCONNECT IDENTITY'
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="unauthenticated"
                  custom={-1}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Enhanced Features */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-cyan-500/20">
                      <Shield className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm text-cyan-100 font-mono">End-to-end encryption</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-purple-500/20">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-cyan-100 font-mono">Lightning fast transactions</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-pink-500/20">
                      <Wallet className="w-5 h-5 text-pink-400" />
                      <span className="text-sm text-cyan-100 font-mono">No seed phrases needed</span>
                    </div>
                  </div>

                  <div className="text-center mb-6 p-4 bg-gray-800/20 rounded-lg border border-cyan-500/20">
                    <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-cyan-200 text-sm font-mono">
                      > Connect securely using Internet Identity to access your DAO dashboard and participate in governance.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all font-semibold text-white shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 font-mono relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                        <span className="relative z-10">CONNECTING...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">CONNECT IDENTITY</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-cyan-300 font-mono">
                    > By connecting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;