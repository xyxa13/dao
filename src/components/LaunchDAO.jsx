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
  Gift,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const LaunchDAO = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
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
    { value: 'DeFi', label: 'DeFi', icon: '💰', description: 'Decentralized Finance protocols', gradient: 'from-green-400 to-emerald-500' },
    { value: 'NFT', label: 'NFT', icon: '🎨', description: 'Non-Fungible Token projects', gradient: 'from-purple-400 to-pink-500' },
    { value: 'Gaming', label: 'Gaming', icon: '🎮', description: 'Blockchain gaming platforms', gradient: 'from-blue-400 to-cyan-500' },
    { value: 'Infrastructure', label: 'Infrastructure', icon: '🏗️', description: 'Blockchain infrastructure', gradient: 'from-orange-400 to-red-500' },
    { value: 'Social', label: 'Social', icon: '👥', description: 'Social and community platforms', gradient: 'from-indigo-400 to-purple-500' },
    { value: 'Metaverse', label: 'Metaverse', icon: '🌐', description: 'Virtual world experiences', gradient: 'from-cyan-400 to-blue-500' },
    { value: 'AI/ML', label: 'AI/ML', icon: '🤖', description: 'Artificial Intelligence & ML', gradient: 'from-pink-400 to-rose-500' },
    { value: 'Other', label: 'Other', icon: '📦', description: 'Other innovative projects', gradient: 'from-gray-400 to-gray-600' }
  ];

  // Exact modules from DAO Maker example - NO AUTO SELECTION
  const moduleCategories = [
    {
      name: 'Governance',
      description: 'Voting mechanisms and proposal systems',
      icon: Vote,
      modules: [
        {
          id: 'token-weighted-voting',
          name: 'Token-Weighted Voting',
          description: 'Traditional token-based voting power',
          selected: false,
          disabled: false
        },
        {
          id: 'quadratic-voting',
          name: 'Quadratic Voting',
          description: 'Quadratic voting to prevent whale dominance',
          selected: false,
          disabled: false
        },
        {
          id: 'delegated-voting',
          name: 'Delegated Voting',
          description: 'Allow token holders to delegate their votes',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      name: 'Treasury',
      description: 'Fund management and financial operations',
      icon: DollarSign,
      modules: [
        {
          id: 'multi-signature-wallet',
          name: 'Multi-Signature Wallet',
          description: 'Secure treasury with multiple approvals',
          selected: false,
          disabled: false
        },
        {
          id: 'streaming-payments',
          name: 'Streaming Payments',
          description: 'Continuous payment streams for contributors',
          selected: false,
          disabled: false
        },
        {
          id: 'token-vesting',
          name: 'Token Vesting',
          description: 'Time-locked token distribution',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      name: 'Staking',
      description: 'Token staking and reward mechanisms',
      icon: Zap,
      modules: [
        {
          id: 'simple-staking',
          name: 'Simple Staking',
          description: 'Basic staking with fixed rewards',
          selected: false,
          disabled: false
        },
        {
          id: 'liquidity-mining',
          name: 'Liquidity Mining',
          description: 'Rewards for providing liquidity',
          selected: false,
          disabled: false
        },
        {
          id: 'governance-staking',
          name: 'Governance Staking',
          description: 'Stake tokens for voting power',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      name: 'Analytics',
      description: 'Monitoring and reporting tools',
      icon: BarChart3,
      modules: [
        {
          id: 'analytics-dashboard',
          name: 'Analytics Dashboard',
          description: 'Real-time DAO metrics and KPIs',
          selected: false,
          disabled: false
        },
        {
          id: 'alert-system',
          name: 'Alert System',
          description: 'Automated notifications for key events',
          selected: false,
          disabled: false
        },
        {
          id: 'financial-reports',
          name: 'Financial Reports',
          description: 'Comprehensive financial reporting',
          selected: false,
          disabled: false
        }
      ]
    }
  ];

  const [selectedModules, setSelectedModules] = useState(moduleCategories);

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'DAO name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        break;
      case 3:
        if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required';
        if (!formData.tokenSupply || formData.tokenSupply <= 0) newErrors.tokenSupply = 'Valid token supply is required';
        break;
      case 4:
        if (!formData.fundingGoal || formData.fundingGoal <= 0) newErrors.fundingGoal = 'Valid funding goal is required';
        if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Valid duration is required';
        if (!formData.minInvestment || formData.minInvestment <= 0) newErrors.minInvestment = 'Valid minimum investment is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleModuleToggle = (categoryIndex, moduleIndex) => {
    const newCategories = [...selectedModules];
    const module = newCategories[categoryIndex].modules[moduleIndex];
    
    if (!module.disabled) {
      module.selected = !module.selected;
      setSelectedModules(newCategories);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setFormData(prev => ({ ...prev, modules: selectedModules }));
      }
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
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

  const getSelectedModulesCount = () => {
    return selectedModules.reduce((total, category) => {
      return total + category.modules.filter(module => module.selected).length;
    }, 0);
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 z-10">
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
                >
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

      {/* Enhanced Modal with Much More Spacing */}
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
              className="bg-gray-900/95 border border-cyan-500/30 rounded-2xl p-12 max-w-7xl w-full max-h-[95vh] relative backdrop-blur-xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Header with More Spacing */}
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-4 font-mono">CREATE YOUR DAO</h2>
                <p className="text-cyan-400 font-mono text-xl">Step {currentStep} of 5</p>
              </div>

              {/* Enhanced Progress Bar with More Spacing */}
              <div className="flex justify-center mb-16">
                <div className="flex items-center space-x-6">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <motion.div 
                        className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all relative ${
                          currentStep >= step.id 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                            : 'border-gray-600 text-gray-400'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <step.icon className="w-8 h-8" />
                        {currentStep >= step.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"
                          />
                        )}
                      </motion.div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-2 mx-4 transition-all rounded-full ${
                          currentStep > step.id 
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                            : 'bg-gray-600'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content - Much More Spacious */}
              <div className="flex-1 overflow-y-auto space-y-12 pr-4">
                {/* Step 1: Basic Info with Massive Spacing */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-12"
                  >
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">DAO Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-6 py-6 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg ${
                            errors.name ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="Enter your DAO name"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-base mt-3 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">Website (Optional)</label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full px-6 py-6 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg"
                          placeholder="https://your-dao-website.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={6}
                        className={`w-full px-6 py-6 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg ${
                          errors.description ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Describe your DAO's mission, goals, and vision"
                      />
                      {errors.description && (
                        <p className="text-red-400 text-base mt-3 flex items-center">
                          <AlertCircle className="w-5 h-5 mr-2" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {/* Enhanced Category Selection with Massive Spacing */}
                    <div className="space-y-6">
                      <label className="block text-lg font-medium text-gray-300 mb-6 font-mono">Category *</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {categories.map((cat) => (
                          <motion.div
                            key={cat.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInputChange('category', cat.value)}
                            className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                              formData.category === cat.value
                                ? 'border-cyan-500 bg-cyan-500/10'
                                : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                            }`}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                            <div className="text-center relative z-10">
                              <div className="text-4xl mb-4">{cat.icon}</div>
                              <h3 className="font-bold text-white mb-3 font-mono text-lg">{cat.label}</h3>
                              <p className="text-sm text-gray-400">{cat.description}</p>
                            </div>
                            {formData.category === cat.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-3 right-3"
                              >
                                <CheckCircle className="w-6 h-6 text-cyan-400" />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      {errors.category && (
                        <p className="text-red-400 text-base mt-3 flex items-center">
                          <AlertCircle className="w-5 h-5 mr-2" />
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Module Selection with Massive Spacing */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-12"
                  >
                    <div className="text-center mb-12">
                      <h3 className="text-3xl font-bold text-white mb-4 font-mono">Select Modules</h3>
                      <p className="text-gray-400 font-mono text-lg">Choose the features your DAO needs. You can add more later.</p>
                    </div>

                    <div className="space-y-16">
                      {selectedModules.map((category, categoryIndex) => (
                        <div key={category.name} className="space-y-8">
                          <div className="flex items-center space-x-6 p-8 bg-gray-800/50 rounded-xl border border-cyan-500/30">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                              <category.icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h4 className="text-2xl font-bold text-white font-mono">{category.name}</h4>
                              <p className="text-gray-400 text-lg">{category.description}</p>
                            </div>
                          </div>

                          <div className="grid gap-8 ml-20">
                            {category.modules.map((module, moduleIndex) => (
                              <motion.div
                                key={module.id}
                                whileHover={{ scale: 1.01 }}
                                className={`flex items-center justify-between p-8 rounded-xl border cursor-pointer transition-all ${
                                  module.selected
                                    ? 'border-cyan-500 bg-cyan-500/10'
                                    : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                                } ${module.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => handleModuleToggle(categoryIndex, moduleIndex)}
                              >
                                <div className="flex items-center space-x-6">
                                  <div className={`w-8 h-8 rounded border-2 flex items-center justify-center ${
                                    module.selected ? 'border-cyan-500 bg-cyan-500' : 'border-gray-400'
                                  }`}>
                                    {module.selected && <CheckCircle className="w-6 h-6 text-white" />}
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-white font-mono text-xl">{module.name}</h5>
                                    <p className="text-gray-400 mt-2 text-lg">{module.description}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Selected Modules Summary with More Spacing */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-8">
                      <h4 className="text-xl font-bold text-white mb-4 font-mono">
                        Selected Modules ({getSelectedModulesCount()})
                      </h4>
                      <div className="text-lg text-gray-400 font-mono">
                        {getSelectedModulesCount() > 0 ? (
                          selectedModules.map(category => 
                            category.modules.filter(m => m.selected).map(module => module.name)
                          ).flat().join(', ')
                        ) : (
                          'No modules selected yet'
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Tokenomics with More Spacing */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-12"
                  >
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">Token Symbol *</label>
                        <input
                          type="text"
                          value={formData.tokenSymbol}
                          onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                          className={`w-full px-6 py-6 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg ${
                            errors.tokenSymbol ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="e.g., MYDAO"
                          maxLength={6}
                        />
                        {errors.tokenSymbol && (
                          <p className="text-red-400 text-base mt-3 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.tokenSymbol}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">Total Supply *</label>
                        <input
                          type="number"
                          value={formData.tokenSupply}
                          onChange={(e) => handleInputChange('tokenSupply', e.target.value)}
                          className={`w-full px-6 py-6 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg ${
                            errors.tokenSupply ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="1000000"
                        />
                        {errors.tokenSupply && (
                          <p className="text-red-400 text-base mt-3 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.tokenSupply}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-10">
                      <h3 className="text-2xl font-bold text-white mb-8 font-mono">Token Distribution</h3>
                      <div className="space-y-8">
                        {[
                          { label: 'Public Sale', percentage: 40, color: 'bg-cyan-500' },
                          { label: 'Team & Advisors', percentage: 20, color: 'bg-purple-500' },
                          { label: 'Treasury', percentage: 25, color: 'bg-green-500' },
                          { label: 'Ecosystem', percentage: 15, color: 'bg-orange-500' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 ${item.color} rounded mr-6`}></div>
                              <span className="text-gray-300 font-mono text-xl">{item.label}</span>
                            </div>
                            <span className="text-cyan-400 font-mono text-xl font-bold">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Funding with More Spacing */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-12"
                  >
                    <div className="grid md:grid-cols-3 gap-12">
                      <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">Funding Goal (ICP) *</label>
                        <input
                          type="number"
                          value={formData.fundingGoal}
                          onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                          className={`w-full px-6 py-6 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg ${
                            errors.fundingGoal ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="1000"
                        />
                        {errors.fundingGoal && (
                          <p className="text-red-400 text-base mt-3 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.fundingGoal}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">Duration (Days) *</label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className={`w-full px-6 py-6 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg ${
                            errors.duration ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="30"
                        />
                        {errors.duration && (
                          <p className="text-red-400 text-base mt-3 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.duration}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-300 mb-4 font-mono">Min Investment (ICP) *</label>
                        <input
                          type="number"
                          value={formData.minInvestment}
                          onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                          className={`w-full px-6 py-6 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono backdrop-blur-sm text-lg ${
                            errors.minInvestment ? 'border-red-500' : 'border-gray-600'
                          }`}
                          placeholder="1"
                        />
                        {errors.minInvestment && (
                          <p className="text-red-400 text-base mt-3 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {errors.minInvestment}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-10">
                      <h3 className="text-2xl font-bold text-white mb-8 font-mono">Funding Milestones</h3>
                      <div className="space-y-6">
                        {[
                          { percentage: 25, milestone: 'MVP Development & Core Team' },
                          { percentage: 50, milestone: 'Beta Launch & Community Building' },
                          { percentage: 75, milestone: 'Marketing & Partnership Expansion' },
                          { percentage: 100, milestone: 'Full Launch & Ecosystem Growth' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-6 bg-gray-700/30 rounded-xl">
                            <span className="text-gray-300 font-mono text-lg">{item.percentage}% - {item.milestone}</span>
                            <CheckCircle className="w-8 h-8 text-green-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Review & Launch with More Spacing */}
                {currentStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-12"
                  >
                    <div className="text-center mb-12">
                      <h3 className="text-3xl font-bold text-white mb-4 font-mono">Review Your DAO</h3>
                      <p className="text-gray-400 font-mono text-lg">Please review all details before launching</p>
                    </div>

                    {/* Basic Info Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-10">
                      <h4 className="text-2xl font-bold text-white mb-8 font-mono flex items-center">
                        <Globe className="w-8 h-8 mr-4" />
                        Basic Information
                      </h4>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Name:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.name || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Category:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.category || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Website:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.website || 'None'}</span>
                        </div>
                      </div>
                      {formData.description && (
                        <div className="mt-8">
                          <span className="text-gray-300 font-mono text-lg">Description:</span>
                          <p className="text-cyan-400 font-mono mt-3 text-lg">{formData.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Selected Modules Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-10">
                      <h4 className="text-2xl font-bold text-white mb-8 font-mono flex items-center">
                        <Settings className="w-8 h-8 mr-4" />
                        Selected Modules ({getSelectedModulesCount()})
                      </h4>
                      {getSelectedModulesCount() > 0 ? (
                        <div className="space-y-4">
                          {selectedModules.map(category => 
                            category.modules.filter(module => module.selected).map(module => (
                              <div key={module.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                                <span className="text-gray-300 font-mono text-lg">{module.name}</span>
                                <CheckCircle className="w-6 h-6 text-green-400" />
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400 font-mono text-lg">No modules selected</p>
                      )}
                    </div>

                    {/* Tokenomics Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-10">
                      <h4 className="text-2xl font-bold text-white mb-8 font-mono flex items-center">
                        <Coins className="w-8 h-8 mr-4" />
                        Tokenomics
                      </h4>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Token Symbol:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.tokenSymbol || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Total Supply:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.tokenSupply ? Number(formData.tokenSupply).toLocaleString() : 'Not set'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Funding Review */}
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-10">
                      <h4 className="text-2xl font-bold text-white mb-8 font-mono flex items-center">
                        <Target className="w-8 h-8 mr-4" />
                        Funding Details
                      </h4>
                      <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Goal:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.fundingGoal || 'Not set'} ICP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Duration:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.duration || 'Not set'} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono text-lg">Min Investment:</span>
                          <span className="text-cyan-400 font-mono text-lg">{formData.minInvestment || 'Not set'} ICP</span>
                        </div>
                      </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-8">
                      <p className="text-yellow-400 text-lg font-mono flex items-center">
                        <Star className="w-6 h-6 mr-3" />
                        Once launched, some DAO parameters cannot be changed. Please review carefully.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Enhanced Navigation Buttons with More Spacing */}
              <div className="flex justify-between mt-16 pt-8 border-t border-gray-700">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-10 py-5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono flex items-center text-lg"
                >
                  <ArrowRight className="w-6 h-6 mr-3 rotate-180" />
                  Previous
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={nextStep}
                    className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all font-mono flex items-center shadow-lg text-lg"
                  >
                    Next
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-mono flex items-center shadow-lg text-lg"
                  >
                    <Rocket className="w-7 h-7 mr-3" />
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