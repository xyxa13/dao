import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Wallet, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Rocket, 
  Settings, 
  Bell,
  ChevronDown,
  Shield,
  Zap,
  TrendingUp,
  Copy,
  ExternalLink,
  Activity,
  DollarSign,
  Award,
  Star,
  Globe,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout, principal } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationCount] = useState(3);

  const navigation = [
    { name: 'Home', href: '/', icon: Globe },
    { name: 'Dashboard', href: '/dashboard', icon: Activity },
    { name: 'Launch DAO', href: '/launch', icon: Rocket, highlight: true },
  ];

  const isActive = (path) => location.pathname === path;

  const copyPrincipal = () => {
    navigator.clipboard.writeText(principal);
    // You could add a toast notification here
  };

  const userStats = {
    totalInvested: '$12,450',
    activeProjects: 8,
    totalReturns: '+24.5%',
    daoTokens: '1,247'
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 relative overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-xl"
                    />
                    <Sparkles className="w-6 h-6 text-white relative z-10" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text font-mono">
                    DAOVerse
                  </span>
                  <span className="text-xs text-cyan-400/70 font-mono -mt-1">
                    > Decentralized Future
                  </span>
                </div>
              </Link>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-lg shadow-cyan-500/20'
                      : item.highlight
                      ? 'text-white bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-red-500/30 hover:shadow-lg hover:shadow-orange-500/20'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${item.highlight ? 'text-orange-400' : ''}`} />
                  <span>{item.name}</span>
                  {item.highlight && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-orange-400 rounded-full"
                    />
                  )}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Enhanced User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0 }}
                    className="relative p-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 rounded-xl transition-all border border-transparent hover:border-gray-700/50"
                  >
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-xs font-bold text-white">{notificationCount}</span>
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Enhanced Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0 }}
                      className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-cyan-500/30 rounded-xl hover:border-cyan-400/50 transition-all shadow-lg backdrop-blur-sm"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium text-white">
                          {principal?.slice(0, 6)}...{principal?.slice(-4)}
                        </span>
                        <span className="text-xs text-cyan-400 font-mono">Connected</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {/* Enhanced Profile Dropdown Menu */}
                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-50"
                        >
                          {/* Profile Header */}
                          <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-gray-700/50">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <User className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-white font-mono">Your Profile</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <code className="text-sm text-cyan-400 font-mono bg-gray-800/50 px-2 py-1 rounded">
                                    {principal?.slice(0, 12)}...{principal?.slice(-8)}
                                  </code>
                                  <button
                                    onClick={copyPrincipal}
                                    className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* User Stats */}
                          <div className="p-4 border-b border-gray-700/50">
                            <h4 className="text-sm font-semibold text-gray-400 mb-3 font-mono">PORTFOLIO OVERVIEW</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                                <div className="flex items-center space-x-2 mb-1">
                                  <DollarSign className="w-4 h-4 text-green-400" />
                                  <span className="text-xs text-gray-400 font-mono">INVESTED</span>
                                </div>
                                <p className="text-lg font-bold text-white">{userStats.totalInvested}</p>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Activity className="w-4 h-4 text-blue-400" />
                                  <span className="text-xs text-gray-400 font-mono">PROJECTS</span>
                                </div>
                                <p className="text-lg font-bold text-white">{userStats.activeProjects}</p>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                                <div className="flex items-center space-x-2 mb-1">
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                  <span className="text-xs text-gray-400 font-mono">RETURNS</span>
                                </div>
                                <p className="text-lg font-bold text-green-400">{userStats.totalReturns}</p>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Award className="w-4 h-4 text-purple-400" />
                                  <span className="text-xs text-gray-400 font-mono">TOKENS</span>
                                </div>
                                <p className="text-lg font-bold text-white">{userStats.daoTokens}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="p-2">
                            <Link
                              to="/dashboard"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all group"
                            >
                              <Activity className="w-5 h-5" />
                              <span className="font-medium">Dashboard</span>
                              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                            </Link>
                            
                            <button className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all w-full group">
                              <Settings className="w-5 h-5" />
                              <span className="font-medium">Settings</span>
                              <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                            </button>

                            <button className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all w-full group">
                              <Shield className="w-5 h-5" />
                              <span className="font-medium">Security</span>
                              <Star className="w-4 h-4 text-yellow-400 ml-auto" />
                            </button>

                            <div className="border-t border-gray-700/50 my-2"></div>

                            <button
                              onClick={() => {
                                logout();
                                setProfileDropdownOpen(false);
                              }}
                              className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all w-full group"
                            >
                              <LogOut className="w-5 h-5" />
                              <span className="font-medium">Disconnect</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-cyan-500/25 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Wallet className="w-5 h-5 relative z-10" />
                  <span className="font-semibold relative z-10">Connect Wallet</span>
                </Link>
              )}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              {isAuthenticated && (
                <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{notificationCount}</span>
                    </div>
                  )}
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-cyan-500/20"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {/* Mobile Navigation Links */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive(item.href)
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                        : item.highlight
                        ? 'text-white bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 border border-transparent'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${item.highlight ? 'text-orange-400' : ''}`} />
                    <span>{item.name}</span>
                    {item.highlight && (
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                    )}
                  </Link>
                ))}
                
                {/* Mobile User Section */}
                {isAuthenticated ? (
                  <div className="border-t border-gray-700/50 pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700/30 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">
                          {principal?.slice(0, 8)}...{principal?.slice(-6)}
                        </div>
                        <div className="text-xs text-cyan-400 font-mono">Connected</div>
                      </div>
                      <button
                        onClick={copyPrincipal}
                        className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Mobile Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                        <div className="text-xs text-gray-400 font-mono mb-1">INVESTED</div>
                        <div className="text-lg font-bold text-white">{userStats.totalInvested}</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
                        <div className="text-xs text-gray-400 font-mono mb-1">RETURNS</div>
                        <div className="text-lg font-bold text-green-400">{userStats.totalReturns}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Disconnect</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Connect Wallet</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop for profile dropdown */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;