import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Target, 
  Calendar,
  FileText,
  Settings,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Upload,
  Globe,
  Shield,
  Zap,
  Star,
  Plus,
  Minus,
  Info,
  Loader2,
  Save,
  Eye,
  EyeOff,
  Sparkles,
  Code,
  Coins
} from 'lucide-react';

const LaunchDAO = () => {
  const { isAuthenticated, principal, loading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    description: '',
    category: 'DeFi',
    website: '',
    logo: null,
    
    // Tokenomics
    tokenName: '',
    tokenSymbol: '',
    totalSupply: '',
    initialPrice: '',
    
    // Governance
    votingPeriod: '7',
    quorumThreshold: '10',
    proposalThreshold: '1',
    
    // Funding
    fundingGoal: '',
    minInvestment: '',
    maxInvestment: '',
    fundingDuration: '30',
    
    // Team
    teamMembers: [
      { name: '', role: '', bio: '', wallet: '' }
    ],
    
    // Legal
    jurisdiction: '',
    termsAccepted: false,
    kycRequired: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, loading, navigate]);

  const steps = [
    { id: 1, title: 'Basic Info', icon: FileText, color: 'from-cyan-400 to-blue-500' },
    { id: 2, title: 'Tokenomics', icon: Coins, color: 'from-green-400 to-emerald-500' },
    { id: 3, title: 'Governance', icon: Users, color: 'from-purple-400 to-pink-500' },
    { id: 4, title: 'Funding', icon: Target, color: 'from-orange-400 to-red-500' },
    { id: 5, title: 'Team', icon: Users, color: 'from-blue-400 to-indigo-500' },
    { id: 6, title: 'Review', icon: CheckCircle, color: 'from-pink-400 to-rose-500' }
  ];

  const categories = ['DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Social', 'Other'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index][field] = value;
    setFormData(prev => ({ ...prev, teamMembers: newTeamMembers }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: '', bio: '', wallet: '' }]
    }));
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 1) {
      const newTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, teamMembers: newTeamMembers }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'DAO name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
      case 2:
        if (!formData.tokenName.trim()) newErrors.tokenName = 'Token name is required';
        if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required';
        if (!formData.totalSupply) newErrors.totalSupply = 'Total supply is required';
        if (!formData.initialPrice) newErrors.initialPrice = 'Initial price is required';
        break;
      case 4:
        if (!formData.fundingGoal) newErrors.fundingGoal = 'Funding goal is required';
        if (!formData.minInvestment) newErrors.minInvestment = 'Minimum investment is required';
        break;
      case 5:
        formData.teamMembers.forEach((member, index) => {
          if (!member.name.trim()) newErrors[`teamMember${index}Name`] = 'Name is required';
          if (!member.role.trim()) newErrors[`teamMember${index}Role`] = 'Role is required';
        });
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page or dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to launch DAO:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <BackgroundParticles />
        <div className="relative min-h-screen flex items-center justify-center px-4 z-10">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
            <p className="text-cyan-400 font-mono">Loading launch pad...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="relative z-10 min-h-screen pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors mr-4 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono">Back to Dashboard</span>
              </button>
            </div>
            
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/25 relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-2xl"
                />
                <Rocket className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 relative">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text font-mono">
                  LAUNCH YOUR DAO
                </span>
              </h1>
              
              <div className="font-mono text-lg text-cyan-400 mb-4">
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  >
                </motion.span>
                {" "}Create your decentralized organization
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 bg-gray-900/50 border border-cyan-500/30 rounded-lg px-3 py-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-mono">Secure</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-900/50 border border-purple-500/30 rounded-lg px-3 py-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-mono">Fast</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-900/50 border border-green-500/30 rounded-lg px-3 py-2">
                  <Globe className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-mono">Decentralized</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-gray-900/50 border border-cyan-500/30 rounded-2xl backdrop-blur-sm p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xl font-semibold text-white font-mono flex items-center">
                  <Code className="w-5 h-5 mr-2 text-cyan-400" />
                  MISSION PROGRESS
                </h3>
                <span className="text-cyan-400 font-mono text-lg font-bold">
                  {currentStep}/{steps.length}
                </span>
              </div>
              
              {/* Desktop Steps */}
              <div className="hidden md:flex items-center justify-between relative z-10">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div 
                      className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all relative overflow-hidden ${
                        currentStep >= step.id
                          ? 'bg-gradient-to-r ' + step.color + ' border-transparent text-white shadow-lg'
                          : 'border-gray-600 text-gray-400 bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0 }}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                      {currentStep >= step.id && (
                        <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                      )}
                    </motion.div>
                    <div className="ml-3 hidden lg:block">
                      <p className={`text-sm font-medium font-mono ${
                        currentStep >= step.id ? 'text-cyan-400' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 lg:w-20 h-1 mx-4 rounded-full transition-all ${
                        currentStep > step.id 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                          : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Steps */}
              <div className="md:hidden relative z-10">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentStep >= step.id 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 scale-125' 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-cyan-400 font-mono text-lg font-bold">
                    {steps[currentStep - 1]?.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Form Container */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900/50 border border-cyan-500/30 rounded-2xl backdrop-blur-sm p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20"></div>
                
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex items-center mb-6">
                        <FileText className="w-8 h-8 text-cyan-400 mr-3" />
                        <h2 className="text-2xl font-bold text-white font-mono">BASIC INFORMATION</h2>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-cyan-400 mb-3 font-mono flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            DAO NAME *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                              errors.name ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-cyan-500/50'
                            }`}
                            placeholder="Enter your DAO name"
                          />
                          {errors.name && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.name}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-cyan-400 mb-3 font-mono">CATEGORY</label>
                          <select
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono hover:border-cyan-500/50 transition-all"
                          >
                            {categories.map(category => (
                              <option key={category} value={category} className="bg-gray-800">{category}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-cyan-400 mb-3 font-mono flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            WEBSITE
                          </label>
                          <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono placeholder-gray-500 hover:border-cyan-500/50 transition-all"
                            placeholder="https://your-dao.com"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-cyan-400 mb-3 font-mono flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            DESCRIPTION *
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={4}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono resize-none placeholder-gray-500 transition-all ${
                              errors.description ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-cyan-500/50'
                            }`}
                            placeholder="Describe your DAO's mission and goals..."
                          />
                          {errors.description && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.description}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Tokenomics */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex items-center mb-6">
                        <Coins className="w-8 h-8 text-green-400 mr-3" />
                        <h2 className="text-2xl font-bold text-white font-mono">TOKENOMICS</h2>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-green-400 mb-3 font-mono">TOKEN NAME *</label>
                          <input
                            type="text"
                            value={formData.tokenName}
                            onChange={(e) => handleInputChange('tokenName', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                              errors.tokenName ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-green-500/50'
                            }`}
                            placeholder="e.g., MyDAO Token"
                          />
                          {errors.tokenName && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.tokenName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-green-400 mb-3 font-mono">TOKEN SYMBOL *</label>
                          <input
                            type="text"
                            value={formData.tokenSymbol}
                            onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                              errors.tokenSymbol ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-green-500/50'
                            }`}
                            placeholder="e.g., MYDAO"
                            maxLength={10}
                          />
                          {errors.tokenSymbol && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.tokenSymbol}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-green-400 mb-3 font-mono">TOTAL SUPPLY *</label>
                          <input
                            type="number"
                            value={formData.totalSupply}
                            onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                              errors.totalSupply ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-green-500/50'
                            }`}
                            placeholder="1000000"
                          />
                          {errors.totalSupply && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.totalSupply}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-green-400 mb-3 font-mono">INITIAL PRICE (USD) *</label>
                          <input
                            type="number"
                            step="0.01"
                            value={formData.initialPrice}
                            onChange={(e) => handleInputChange('initialPrice', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                              errors.initialPrice ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-green-500/50'
                            }`}
                            placeholder="1.00"
                          />
                          {errors.initialPrice && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.initialPrice}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Governance */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex items-center mb-6">
                        <Users className="w-8 h-8 text-purple-400 mr-3" />
                        <h2 className="text-2xl font-bold text-white font-mono">GOVERNANCE SETTINGS</h2>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-purple-400 mb-3 font-mono">VOTING PERIOD (DAYS)</label>
                          <input
                            type="number"
                            value={formData.votingPeriod}
                            onChange={(e) => handleInputChange('votingPeriod', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono hover:border-purple-500/50 transition-all"
                            min="1"
                            max="30"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-purple-400 mb-3 font-mono">QUORUM THRESHOLD (%)</label>
                          <input
                            type="number"
                            value={formData.quorumThreshold}
                            onChange={(e) => handleInputChange('quorumThreshold', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono hover:border-purple-500/50 transition-all"
                            min="1"
                            max="100"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-purple-400 mb-3 font-mono">PROPOSAL THRESHOLD (%)</label>
                          <input
                            type="number"
                            value={formData.proposalThreshold}
                            onChange={(e) => handleInputChange('proposalThreshold', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono hover:border-purple-500/50 transition-all"
                            min="0.1"
                            max="10"
                            step="0.1"
                          />
                          <p className="text-gray-400 text-sm mt-2 font-mono">Minimum token percentage required to create proposals</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Funding */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex items-center mb-6">
                        <Target className="w-8 h-8 text-orange-400 mr-3" />
                        <h2 className="text-2xl font-bold text-white font-mono">FUNDING DETAILS</h2>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-orange-400 mb-3 font-mono">FUNDING GOAL (USD) *</label>
                          <input
                            type="number"
                            value={formData.fundingGoal}
                            onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                              errors.fundingGoal ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-orange-500/50'
                            }`}
                            placeholder="100000"
                          />
                          {errors.fundingGoal && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.fundingGoal}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-orange-400 mb-3 font-mono">FUNDING DURATION (DAYS)</label>
                          <input
                            type="number"
                            value={formData.fundingDuration}
                            onChange={(e) => handleInputChange('fundingDuration', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-mono hover:border-orange-500/50 transition-all"
                            min="7"
                            max="365"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-orange-400 mb-3 font-mono">MIN INVESTMENT (USD) *</label>
                          <input
                            type="number"
                            value={formData.minInvestment}
                            onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                              errors.minInvestment ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-600 hover:border-orange-500/50'
                            }`}
                            placeholder="100"
                          />
                          {errors.minInvestment && <p className="text-red-400 text-sm mt-2 font-mono flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.minInvestment}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-orange-400 mb-3 font-mono">MAX INVESTMENT (USD)</label>
                          <input
                            type="number"
                            value={formData.maxInvestment}
                            onChange={(e) => handleInputChange('maxInvestment', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-mono placeholder-gray-500 hover:border-orange-500/50 transition-all"
                            placeholder="10000"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Team */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <Users className="w-8 h-8 text-blue-400 mr-3" />
                          <h2 className="text-2xl font-bold text-white font-mono">TEAM MEMBERS</h2>
                        </div>
                        <motion.button
                          onClick={addTeamMember}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors font-mono"
                        >
                          <Plus className="w-4 h-4" />
                          <span>ADD MEMBER</span>
                        </motion.button>
                      </div>
                      
                      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                        {formData.teamMembers.map((member, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-800/30 border border-gray-600 rounded-xl p-6 relative"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold text-blue-400 font-mono">MEMBER {index + 1}</h3>
                              {formData.teamMembers.length > 1 && (
                                <button
                                  onClick={() => removeTeamMember(index)}
                                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                                >
                                  <Minus className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-blue-400 mb-2 font-mono">NAME *</label>
                                <input
                                  type="text"
                                  value={member.name}
                                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                  className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                                    errors[`teamMember${index}Name`] ? 'border-red-500' : 'border-gray-600 hover:border-blue-500/50'
                                  }`}
                                  placeholder="Full name"
                                />
                                {errors[`teamMember${index}Name`] && (
                                  <p className="text-red-400 text-xs mt-1 font-mono">{errors[`teamMember${index}Name`]}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-semibold text-blue-400 mb-2 font-mono">ROLE *</label>
                                <input
                                  type="text"
                                  value={member.role}
                                  onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                                  className={`w-full px-3 py-2 bg-gray-800/50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-mono placeholder-gray-500 transition-all ${
                                    errors[`teamMember${index}Role`] ? 'border-red-500' : 'border-gray-600 hover:border-blue-500/50'
                                  }`}
                                  placeholder="e.g., CEO, CTO"
                                />
                                {errors[`teamMember${index}Role`] && (
                                  <p className="text-red-400 text-xs mt-1 font-mono">{errors[`teamMember${index}Role`]}</p>
                                )}
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-sm font-semibold text-blue-400 mb-2 font-mono">BIO</label>
                                <textarea
                                  value={member.bio}
                                  onChange={(e) => handleTeamMemberChange(index, 'bio', e.target.value)}
                                  rows={2}
                                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-mono resize-none placeholder-gray-500 hover:border-blue-500/50 transition-all"
                                  placeholder="Brief bio..."
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 6: Review */}
                  {currentStep === 6 && (
                    <motion.div
                      key="step6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex items-center mb-6">
                        <CheckCircle className="w-8 h-8 text-pink-400 mr-3" />
                        <h2 className="text-2xl font-bold text-white font-mono">REVIEW & LAUNCH</h2>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Summary Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-gray-800/30 border border-cyan-500/30 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-cyan-400 mb-3 font-mono">BASIC INFO</h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-400">Name:</span> <span className="text-white font-mono">{formData.name}</span></p>
                              <p><span className="text-gray-400">Category:</span> <span className="text-white font-mono">{formData.category}</span></p>
                            </div>
                          </div>

                          <div className="bg-gray-800/30 border border-green-500/30 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-green-400 mb-3 font-mono">TOKENOMICS</h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-400">Token:</span> <span className="text-white font-mono">{formData.tokenName} ({formData.tokenSymbol})</span></p>
                              <p><span className="text-gray-400">Supply:</span> <span className="text-white font-mono">{formData.totalSupply?.toLocaleString()}</span></p>
                            </div>
                          </div>

                          <div className="bg-gray-800/30 border border-purple-500/30 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-purple-400 mb-3 font-mono">GOVERNANCE</h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-400">Voting:</span> <span className="text-white font-mono">{formData.votingPeriod} days</span></p>
                              <p><span className="text-gray-400">Quorum:</span> <span className="text-white font-mono">{formData.quorumThreshold}%</span></p>
                            </div>
                          </div>

                          <div className="bg-gray-800/30 border border-orange-500/30 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-orange-400 mb-3 font-mono">FUNDING</h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-400">Goal:</span> <span className="text-white font-mono">${formData.fundingGoal?.toLocaleString()}</span></p>
                              <p><span className="text-gray-400">Min:</span> <span className="text-white font-mono">${formData.minInvestment}</span></p>
                            </div>
                          </div>
                        </div>

                        {/* Legal Checkboxes */}
                        <div className="bg-gray-800/30 border border-pink-500/30 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-pink-400 mb-4 font-mono">LEGAL & COMPLIANCE</h3>
                          <div className="space-y-4">
                            <label className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                className="mt-1 w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                              />
                              <span className="text-sm text-gray-300 font-mono">
                                I agree to the Terms of Service and confirm all information is accurate.
                              </span>
                            </label>
                            
                            <label className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.kycRequired}
                                onChange={(e) => handleInputChange('kycRequired', e.target.checked)}
                                className="mt-1 w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                              />
                              <span className="text-sm text-gray-300 font-mono">
                                Require KYC verification for investors.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-700/50 mt-8 relative z-10">
                  <motion.button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    whileHover={{ scale: currentStep === 1 ? 1 : 1.02 }}
                    whileTap={{ scale: currentStep === 1 ? 1 : 0.98 }}
                    transition={{ duration: 0 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>PREVIOUS</span>
                  </motion.button>

                  {currentStep < steps.length ? (
                    <motion.button
                      onClick={nextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-xl transition-all font-semibold font-mono shadow-lg shadow-cyan-500/25 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10">NEXT</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.termsAccepted}
                      whileHover={{ scale: isSubmitting || !formData.termsAccepted ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting || !formData.termsAccepted ? 1 : 0.98 }}
                      transition={{ duration: 0 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed font-mono shadow-lg shadow-orange-500/25 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                          <span className="relative z-10">LAUNCHING...</span>
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5 relative z-10" />
                          <span className="relative z-10">LAUNCH DAO</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900/50 border border-cyan-500/30 rounded-2xl backdrop-blur-sm p-6 sticky top-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
                
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-4 font-mono flex items-center">
                    <Info className="w-5 h-5 mr-2 text-cyan-400" />
                    MISSION TIPS
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    {currentStep === 1 && (
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <p className="text-cyan-100 font-mono">Choose a memorable name for your DAO.</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <FileText className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <p className="text-purple-100 font-mono">Clear description helps attract investors.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 2 && (
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <Coins className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-green-100 font-mono">Token symbol should be 3-5 characters.</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <DollarSign className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <p className="text-emerald-100 font-mono">Consider token distribution carefully.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 3 && (
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <Users className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <p className="text-purple-100 font-mono">Longer voting allows more participation.</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                          <Shield className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                          <p className="text-pink-100 font-mono">Higher quorum ensures legitimacy.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 4 && (
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <Target className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                          <p className="text-orange-100 font-mono">Set realistic funding goals.</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <DollarSign className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <p className="text-red-100 font-mono">Consider minimum viable funding.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 5 && (
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <Users className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <p className="text-blue-100 font-mono">Include key team members.</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <Shield className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <p className="text-indigo-100 font-mono">Transparency builds confidence.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 6 && (
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-green-100 font-mono">Review carefully before launch.</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <p className="text-yellow-100 font-mono">Some settings can't be changed.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Progress Summary */}
                  <div className="mt-6 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-400 font-mono">COMPLETION</span>
                      <span className="text-cyan-400 font-mono font-bold">{Math.round((currentStep / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-xs text-gray-400 font-mono">
                        Step {currentStep} of {steps.length}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDAO;