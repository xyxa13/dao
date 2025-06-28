import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Users, 
  Coins, 
  Target, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Upload,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  X,
  Plus,
  Sparkles,
  Star,
  Settings,
  Vote,
  DollarSign,
  Lock,
  Unlock,
  BarChart3,
  FileText,
  MessageSquare,
  Gavel,
  Trophy,
  Gift
} from 'lucide-react';

const LaunchDAO = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModules, setSelectedModules] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    fundingGoal: '',
    duration: '',
    tokenSymbol: '',
    tokenSupply: '',
    minInvestment: '',
    website: '',
    whitepaper: null,
    logo: null,
    modules: []
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: Globe },
    { id: 2, title: 'Module Selection', icon: Settings },
    { id: 3, title: 'Tokenomics', icon: Coins },
    { id: 4, title: 'Funding', icon: Target },
    { id: 5, title: 'Review & Launch', icon: CheckCircle }
  ];

  const categories = [
    'DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Social', 'Metaverse', 'AI/ML', 'Other'
  ];

  const modules = [
    {
      id: 'governance',
      name: 'Governance Module',
      description: 'Enable voting and proposal creation for DAO members',
      icon: Vote,
      color: 'from-blue-500 to-cyan-500',
      features: ['Proposal Creation', 'Voting System', 'Delegation', 'Quorum Management'],
      price: 'Free'
    },
    {
      id: 'treasury',
      name: 'Treasury Management',
      description: 'Manage DAO funds and financial operations',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      features: ['Multi-sig Wallet', 'Budget Tracking', 'Payment Automation', 'Financial Reports'],
      price: '0.5 ICP/month'
    },
    {
      id: 'staking',
      name: 'Staking & Rewards',
      description: 'Implement token staking and reward distribution',
      icon: Lock,
      color: 'from-purple-500 to-pink-500',
      features: ['Token Staking', 'Reward Distribution', 'Lock Periods', 'APY Calculator'],
      price: '1 ICP/month'
    },
    {
      id: 'marketplace',
      name: 'NFT Marketplace',
      description: 'Built-in marketplace for trading NFTs',
      icon: Trophy,
      color: 'from-orange-500 to-red-500',
      features: ['NFT Trading', 'Royalty System', 'Auction System', 'Collection Management'],
      price: '2 ICP/month'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting tools',
      icon: BarChart3,
      color: 'from-indigo-500 to-blue-500',
      features: ['Member Analytics', 'Token Metrics', 'Governance Stats', 'Custom Reports'],
      price: '0.8 ICP/month'
    },
    {
      id: 'communication',
      name: 'Communication Hub',
      description: 'Built-in chat and announcement system',
      icon: MessageSquare,
      color: 'from-teal-500 to-cyan-500',
      features: ['Group Chat', 'Announcements', 'Direct Messages', 'Notification System'],
      price: '0.3 ICP/month'
    },
    {
      id: 'legal',
      name: 'Legal Framework',
      description: 'Legal compliance and documentation tools',
      icon: Gavel,
      color: 'from-gray-500 to-slate-500',
      features: ['Legal Templates', 'Compliance Tracking', 'Document Storage', 'Audit Trail'],
      price: '1.5 ICP/month'
    },
    {
      id: 'rewards',
      name: 'Incentive System',
      description: 'Gamified rewards and achievement system',
      icon: Gift,
      color: 'from-yellow-500 to-orange-500',
      features: ['Achievement Badges', 'Point System', 'Leaderboards', 'Custom Rewards'],
      price: '0.6 ICP/month'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleToggle = (moduleId) => {
    setSelectedModules(prev => {
      const isSelected = prev.includes(moduleId);
      if (isSelected) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const nextStep = () => {
    if (currentStep === 2) {
      setFormData(prev => ({ ...prev, modules: selectedModules }));
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const finalData = { ...formData, modules: selectedModules };
    console.log('Creating DAO with data:', finalData);
    setIsModalOpen(false);
    // Show success animation or redirect
  };

  const openModal = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setIsModalOpen(true);
  };

  const getTotalMonthlyCost = () => {
    return selectedModules.reduce((total, moduleId) => {
      const module = modules.find(m => m.id === moduleId);
      if (module && module.price !== 'Free') {
        const price = parseFloat(module.price.split(' ')[0]);
        return total + price;
      }
      return total;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        
        {/* Enhanced Floating Particles */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'w-2 h-2 bg-cyan-400' :
              i % 4 === 1 ? 'w-1 h-1 bg-purple-400' :
              i % 4 === 2 ? 'w-1.5 h-1.5 bg-pink-400' :
              'w-1 h-1 bg-blue-400'
            }`}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 40 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {[...Array(400)].map((_, i) => (
              <div key={i} className="border border-cyan-500/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-6 shadow-lg shadow-cyan-500/25"
              >
                <Rocket className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  LAUNCH
                </span>
              </h1>
            </div>
            
            <motion.div 
              className="font-mono text-2xl md:text-3xl text-cyan-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &gt;
              </motion.span>
              {" "}YOUR DECENTRALIZED FUTURE
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Build, fund, and govern your DAO with modular components. Choose exactly what you need.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { 
                icon: Settings, 
                title: 'Modular Design', 
                desc: 'Pick and choose the modules you need',
                gradient: 'from-cyan-500 to-blue-500'
              },
              { 
                icon: Zap, 
                title: 'Instant Deploy', 
                desc: 'Launch your DAO in minutes, not months',
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                icon: TrendingUp, 
                title: 'Scale Ready', 
                desc: 'Built for growth from day one',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-mono relative z-10">{feature.title}</h3>
                <p className="text-gray-200 relative z-10 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Launch Button */}
          <motion.button
            onClick={openModal}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-xl transition-all duration-300 overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="mr-3 w-6 h-6" />
              </motion.div>
              LAUNCH YOUR DAO
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </motion.button>
        </div>
      </section>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-gray-900/95 border border-cyan-500/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative backdrop-blur-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-2 font-mono">CREATE YOUR DAO</h2>
                <p className="text-cyan-400 font-mono">Step {currentStep} of 5</p>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-2">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <motion.div 
                        className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all relative ${
                          currentStep >= step.id 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                            : 'border-gray-600 text-gray-400'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <step.icon className="w-6 h-6" />
                        {currentStep >= step.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"
                          />
                        )}
                      </motion.div>
                      {index < steps.length - 1 && (
                        <div className={`w-12 h-1 mx-2 transition-all rounded-full ${
                          currentStep > step.id 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                            : 'bg-gray-600'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">DAO Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                          placeholder="Enter your DAO name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                        >
                          <option value="">Select a category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                        placeholder="Describe your DAO's mission, goals, and vision"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Website (Optional)</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                        placeholder="https://your-dao-website.com"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Module Selection */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2 font-mono">Choose Your Modules</h3>
                      <p className="text-gray-400 font-mono">Select the features your DAO needs. You can add more later.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {modules.map((module) => (
                        <motion.div
                          key={module.id}
                          whileHover={{ scale: 1.02 }}
                          className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedModules.includes(module.id)
                              ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/25'
                              : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                          }`}
                          onClick={() => handleModuleToggle(module.id)}
                        >
                          {/* Selection Indicator */}
                          <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedModules.includes(module.id)
                              ? 'border-cyan-500 bg-cyan-500'
                              : 'border-gray-400'
                          }`}>
                            {selectedModules.includes(module.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <CheckCircle className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>

                          {/* Module Icon */}
                          <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center mb-4`}>
                            <module.icon className="w-6 h-6 text-white" />
                          </div>

                          {/* Module Info */}
                          <h4 className="text-lg font-bold text-white mb-2 font-mono">{module.name}</h4>
                          <p className="text-gray-400 text-sm mb-4">{module.description}</p>

                          {/* Features */}
                          <div className="space-y-1 mb-4">
                            {module.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-center text-xs text-gray-300">
                                <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                                {feature}
                              </div>
                            ))}
                            {module.features.length > 3 && (
                              <div className="text-xs text-gray-500">+{module.features.length - 3} more features</div>
                            )}
                          </div>

                          {/* Price */}
                          <div className="flex justify-between items-center">
                            <span className={`text-sm font-bold ${
                              module.price === 'Free' ? 'text-green-400' : 'text-cyan-400'
                            } font-mono`}>
                              {module.price}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Cost Summary */}
                    {selectedModules.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6"
                      >
                        <h4 className="text-lg font-bold text-white mb-4 font-mono">Selected Modules ({selectedModules.length})</h4>
                        <div className="space-y-2 mb-4">
                          {selectedModules.map(moduleId => {
                            const module = modules.find(m => m.id === moduleId);
                            return (
                              <div key={moduleId} className="flex justify-between items-center">
                                <span className="text-gray-300 font-mono">{module.name}</span>
                                <span className="text-cyan-400 font-mono">{module.price}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border-t border-gray-600 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-bold font-mono">Total Monthly Cost:</span>
                            <span className="text-cyan-400 font-bold font-mono">
                              {getTotalMonthlyCost() === 0 ? 'Free' : `${getTotalMonthlyCost()} ICP/month`}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Tokenomics */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Token Symbol *</label>
                        <input
                          type="text"
                          value={formData.tokenSymbol}
                          onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                          placeholder="e.g., MYDAO"
                          maxLength={6}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Total Supply *</label>
                        <input
                          type="number"
                          value={formData.tokenSupply}
                          onChange={(e) => handleInputChange('tokenSupply', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                          placeholder="1000000"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-mono">Token Distribution</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Public Sale', percentage: 40, color: 'bg-cyan-500' },
                          { label: 'Team & Advisors', percentage: 20, color: 'bg-purple-500' },
                          { label: 'Treasury', percentage: 25, color: 'bg-green-500' },
                          { label: 'Ecosystem', percentage: 15, color: 'bg-orange-500' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-4 h-4 ${item.color} rounded mr-3`}></div>
                              <span className="text-gray-300 font-mono">{item.label}</span>
                            </div>
                            <span className="text-cyan-400 font-mono">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Funding */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Funding Goal (ICP) *</label>
                        <input
                          type="number"
                          value={formData.fundingGoal}
                          onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                          placeholder="1000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Duration (Days) *</label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                          placeholder="30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Min Investment (ICP) *</label>
                        <input
                          type="number"
                          value={formData.minInvestment}
                          onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm"
                          placeholder="1"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-mono">Funding Milestones</h3>
                      <div className="space-y-3">
                        {[
                          { percentage: 25, milestone: 'MVP Development & Core Team' },
                          { percentage: 50, milestone: 'Beta Launch & Community Building' },
                          { percentage: 75, milestone: 'Marketing & Partnership Expansion' },
                          { percentage: 100, milestone: 'Full Launch & Ecosystem Growth' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-300 font-mono">{item.percentage}% - {item.milestone}</span>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Review & Launch */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2 font-mono">Review Your DAO</h3>
                      <p className="text-gray-400 font-mono">Please review all details before launching</p>
                    </div>

                    {/* Basic Info Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-4 font-mono flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Basic Information
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Name:</span>
                          <span className="text-cyan-400 font-mono">{formData.name || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Category:</span>
                          <span className="text-cyan-400 font-mono">{formData.category || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Website:</span>
                          <span className="text-cyan-400 font-mono">{formData.website || 'None'}</span>
                        </div>
                      </div>
                      {formData.description && (
                        <div className="mt-4">
                          <span className="text-gray-300 font-mono">Description:</span>
                          <p className="text-cyan-400 font-mono mt-1">{formData.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Selected Modules Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-4 font-mono flex items-center">
                        <Settings className="w-5 h-5 mr-2" />
                        Selected Modules ({selectedModules.length})
                      </h4>
                      {selectedModules.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          {selectedModules.map(moduleId => {
                            const module = modules.find(m => m.id === moduleId);
                            return (
                              <div key={moduleId} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`w-8 h-8 bg-gradient-to-r ${module.color} rounded mr-3 flex items-center justify-center`}>
                                    <module.icon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-gray-300 font-mono">{module.name}</span>
                                </div>
                                <span className="text-cyan-400 font-mono">{module.price}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-400 font-mono">No modules selected</p>
                      )}
                      {getTotalMonthlyCost() > 0 && (
                        <div className="border-t border-gray-600 mt-4 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-bold font-mono">Monthly Cost:</span>
                            <span className="text-cyan-400 font-bold font-mono">{getTotalMonthlyCost()} ICP/month</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tokenomics Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-4 font-mono flex items-center">
                        <Coins className="w-5 h-5 mr-2" />
                        Tokenomics
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Token Symbol:</span>
                          <span className="text-cyan-400 font-mono">{formData.tokenSymbol || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Total Supply:</span>
                          <span className="text-cyan-400 font-mono">{formData.tokenSupply ? Number(formData.tokenSupply).toLocaleString() : 'Not set'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Funding Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-4 font-mono flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Funding Details
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Goal:</span>
                          <span className="text-cyan-400 font-mono">{formData.fundingGoal || 'Not set'} ICP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Duration:</span>
                          <span className="text-cyan-400 font-mono">{formData.duration || 'Not set'} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Min Investment:</span>
                          <span className="text-cyan-400 font-mono">{formData.minInvestment || 'Not set'} ICP</span>
                        </div>
                      </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                      <p className="text-yellow-400 text-sm font-mono flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Once launched, some DAO parameters cannot be changed. Please review carefully.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Enhanced Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Previous
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all font-mono flex items-center shadow-lg"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-mono flex items-center shadow-lg"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Launch DAO
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaunchDAO;