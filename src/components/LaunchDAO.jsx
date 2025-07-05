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
  Coins,
  Code,
  Database,
  Vote,
  TrendingUp,
  Lock,
  Layers
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
    
    // Module Selection
    selectedModules: {
      governance: true,
      treasury: true,
      staking: false,
      proposals: false,
      voting: false,
      membership: false
    },
    
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
    { id: 2, title: 'Module Selection', icon: Layers, color: 'from-green-400 to-emerald-500' },
    { id: 3, title: 'Tokenomics', icon: DollarSign, color: 'from-purple-400 to-pink-500' },
    { id: 4, title: 'Governance', icon: Users, color: 'from-orange-400 to-red-500' },
    { id: 5, title: 'Funding', icon: Target, color: 'from-blue-400 to-indigo-500' },
    { id: 6, title: 'Team', icon: Users, color: 'from-pink-400 to-rose-500' },
    { id: 7, title: 'Review', icon: CheckCircle, color: 'from-green-400 to-teal-500' }
  ];

  const categories = ['DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Social', 'Other'];

  const moduleOptions = [
    {
      id: 'governance',
      name: 'Governance',
      description: 'Core governance functionality for proposals and voting',
      icon: Vote,
      required: true,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'treasury',
      name: 'Treasury',
      description: 'Manage DAO funds and financial operations',
      icon: DollarSign,
      required: true,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'staking',
      name: 'Staking',
      description: 'Token staking and reward distribution system',
      icon: Coins,
      required: false,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'proposals',
      name: 'Advanced Proposals',
      description: 'Enhanced proposal templates and categorization',
      icon: FileText,
      required: false,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'voting',
      name: 'Voting Extensions',
      description: 'Advanced voting mechanisms and delegation',
      icon: TrendingUp,
      required: false,
      color: 'from-indigo-400 to-blue-500'
    },
    {
      id: 'membership',
      name: 'Membership',
      description: 'Member management and role-based permissions',
      icon: Users,
      required: false,
      color: 'from-pink-400 to-rose-500'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleModuleToggle = (moduleId) => {
    const module = moduleOptions.find(m => m.id === moduleId);
    if (module?.required) return; // Can't toggle required modules
    
    setFormData(prev => ({
      ...prev,
      selectedModules: {
        ...prev.selectedModules,
        [moduleId]: !prev.selectedModules[moduleId]
      }
    }));
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
        // Module selection validation - at least governance and treasury must be selected
        const selectedCount = Object.values(formData.selectedModules).filter(Boolean).length;
        if (selectedCount < 2) newErrors.modules = 'At least governance and treasury modules are required';
        break;
      case 3:
        if (!formData.tokenName.trim()) newErrors.tokenName = 'Token name is required';
        if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required';
        if (!formData.totalSupply) newErrors.totalSupply = 'Total supply is required';
        if (!formData.initialPrice) newErrors.initialPrice = 'Initial price is required';
        break;
      case 5:
        if (!formData.fundingGoal) newErrors.fundingGoal = 'Funding goal is required';
        if (!formData.minInvestment) newErrors.minInvestment = 'Minimum investment is required';
        break;
      case 6:
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
      <div className="h-screen bg-black text-white relative overflow-hidden">
        <BackgroundParticles />
        <div className="relative h-full flex items-center justify-center px-4 z-10">
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
    <div className="h-screen bg-black text-white relative overflow-hidden">
      <BackgroundParticles />
      
      {/* Main Content Container - Fixed Height with Scroll */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 pt-20 pb-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <div className="flex items-center mb-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors mr-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-mono text-sm">Back</span>
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 font-mono">
                    <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
                      LAUNCH YOUR DAO
                    </span>
                  </h1>
                  <p className="text-cyan-400 font-mono text-sm">
                    > Create your decentralized organization
                  </p>
                </div>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-gray-700 transition-colors font-mono text-sm"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="hidden sm:inline">{showPreview ? 'Hide' : 'Preview'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* Progress Steps - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl backdrop-blur-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-white font-mono">Progress</h3>
                  <span className="text-cyan-400 font-mono text-sm">
                    {currentStep}/{steps.length}
                  </span>
                </div>
                
                {/* Desktop Steps */}
                <div className="hidden md:flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                        currentStep >= step.id
                          ? `bg-gradient-to-r ${step.color} border-transparent text-white`
                          : 'border-gray-600 text-gray-400'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="ml-2 hidden lg:block">
                        <p className={`text-xs font-medium ${
                          currentStep >= step.id ? 'text-cyan-400' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-8 lg:w-16 h-0.5 mx-3 ${
                          currentStep > step.id ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Steps */}
                <div className="md:hidden">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {steps.map((step) => (
                      <div
                        key={step.id}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentStep >= step.id ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-cyan-400 font-mono text-sm">
                      {steps[currentStep - 1]?.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Content */}
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-900/50 border border-cyan-500/30 rounded-xl backdrop-blur-sm p-6"
                >
                  <AnimatePresence mode="wait">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="text-lg font-bold text-white font-mono">Basic Information</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">DAO Name *</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono text-sm ${
                                errors.name ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="Enter your DAO name"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Category</label>
                            <select
                              value={formData.category}
                              onChange={(e) => handleInputChange('category', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono text-sm"
                            >
                              {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Website</label>
                            <input
                              type="url"
                              value={formData.website}
                              onChange={(e) => handleInputChange('website', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono text-sm"
                              placeholder="https://your-dao.com"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Description *</label>
                            <textarea
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              rows={3}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono resize-none text-sm ${
                                errors.description ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="Describe your DAO's mission and goals..."
                            />
                            {errors.description && <p className="text-red-400 text-xs mt-1 font-mono">{errors.description}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Module Selection */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Layers className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="text-lg font-bold text-white font-mono">Module Selection</h2>
                        </div>
                        
                        {errors.modules && (
                          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm font-mono">{errors.modules}</p>
                          </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                          {moduleOptions.map((module) => (
                            <motion.div
                              key={module.id}
                              whileHover={{ scale: 1.02 }}
                              className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                formData.selectedModules[module.id]
                                  ? `border-transparent bg-gradient-to-r ${module.color} bg-opacity-20`
                                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                              } ${module.required ? 'opacity-75' : ''}`}
                              onClick={() => handleModuleToggle(module.id)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  formData.selectedModules[module.id]
                                    ? `bg-gradient-to-r ${module.color}`
                                    : 'bg-gray-700'
                                }`}>
                                  <module.icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-semibold text-white font-mono">
                                      {module.name}
                                    </h3>
                                    {module.required && (
                                      <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded font-mono">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-400 leading-relaxed">
                                    {module.description}
                                  </p>
                                </div>
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  formData.selectedModules[module.id]
                                    ? 'bg-white border-white'
                                    : 'border-gray-500'
                                }`}>
                                  {formData.selectedModules[module.id] && (
                                    <CheckCircle className="w-3 h-3 text-gray-800" />
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-blue-400 text-sm font-mono mb-1">Module Information</p>
                              <p className="text-blue-200 text-xs">
                                Governance and Treasury modules are required for all DAOs. Additional modules can be enabled to extend functionality.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Tokenomics */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="text-lg font-bold text-white font-mono">Tokenomics</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Token Name *</label>
                            <input
                              type="text"
                              value={formData.tokenName}
                              onChange={(e) => handleInputChange('tokenName', e.target.value)}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono text-sm ${
                                errors.tokenName ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="e.g., MyDAO Token"
                            />
                            {errors.tokenName && <p className="text-red-400 text-xs mt-1 font-mono">{errors.tokenName}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Token Symbol *</label>
                            <input
                              type="text"
                              value={formData.tokenSymbol}
                              onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono text-sm ${
                                errors.tokenSymbol ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="e.g., MYDAO"
                              maxLength={10}
                            />
                            {errors.tokenSymbol && <p className="text-red-400 text-xs mt-1 font-mono">{errors.tokenSymbol}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Total Supply *</label>
                            <input
                              type="number"
                              value={formData.totalSupply}
                              onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono text-sm ${
                                errors.totalSupply ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="1000000"
                            />
                            {errors.totalSupply && <p className="text-red-400 text-xs mt-1 font-mono">{errors.totalSupply}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Initial Price (USD) *</label>
                            <input
                              type="number"
                              step="0.01"
                              value={formData.initialPrice}
                              onChange={(e) => handleInputChange('initialPrice', e.target.value)}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono text-sm ${
                                errors.initialPrice ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="1.00"
                            />
                            {errors.initialPrice && <p className="text-red-400 text-xs mt-1 font-mono">{errors.initialPrice}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Governance */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="text-lg font-bold text-white font-mono">Governance Settings</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Voting Period (days)</label>
                            <input
                              type="number"
                              value={formData.votingPeriod}
                              onChange={(e) => handleInputChange('votingPeriod', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-mono text-sm"
                              min="1"
                              max="30"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Quorum Threshold (%)</label>
                            <input
                              type="number"
                              value={formData.quorumThreshold}
                              onChange={(e) => handleInputChange('quorumThreshold', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-mono text-sm"
                              min="1"
                              max="100"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Proposal Threshold (%)</label>
                            <input
                              type="number"
                              value={formData.proposalThreshold}
                              onChange={(e) => handleInputChange('proposalThreshold', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-mono text-sm"
                              min="0.1"
                              max="10"
                              step="0.1"
                            />
                            <p className="text-gray-400 text-xs mt-1 font-mono">Minimum token percentage required to create proposals</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Funding */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="text-lg font-bold text-white font-mono">Funding Details</h2>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Funding Goal (USD) *</label>
                            <input
                              type="number"
                              value={formData.fundingGoal}
                              onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-mono text-sm ${
                                errors.fundingGoal ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="100000"
                            />
                            {errors.fundingGoal && <p className="text-red-400 text-xs mt-1 font-mono">{errors.fundingGoal}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Funding Duration (days)</label>
                            <input
                              type="number"
                              value={formData.fundingDuration}
                              onChange={(e) => handleInputChange('fundingDuration', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-mono text-sm"
                              min="7"
                              max="365"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Min Investment (USD) *</label>
                            <input
                              type="number"
                              value={formData.minInvestment}
                              onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                              className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-mono text-sm ${
                                errors.minInvestment ? 'border-red-500' : 'border-gray-600'
                              }`}
                              placeholder="100"
                            />
                            {errors.minInvestment && <p className="text-red-400 text-xs mt-1 font-mono">{errors.minInvestment}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Max Investment (USD)</label>
                            <input
                              type="number"
                              value={formData.maxInvestment}
                              onChange={(e) => handleInputChange('maxInvestment', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white font-mono text-sm"
                              placeholder="10000"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 6: Team */}
                    {currentStep === 6 && (
                      <motion.div
                        key="step6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-bold text-white font-mono">Team Members</h2>
                          </div>
                          <button
                            onClick={addTeamMember}
                            className="flex items-center space-x-2 px-3 py-2 bg-pink-500/20 border border-pink-500/30 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-colors font-mono text-sm"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                          </button>
                        </div>
                        
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                          {formData.teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-white font-mono">Member {index + 1}</h3>
                                {formData.teamMembers.length > 1 && (
                                  <button
                                    onClick={() => removeTeamMember(index)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-300 mb-1 font-mono">Name *</label>
                                  <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white font-mono text-sm ${
                                      errors[`teamMember${index}Name`] ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="Full name"
                                  />
                                  {errors[`teamMember${index}Name`] && (
                                    <p className="text-red-400 text-xs mt-1 font-mono">{errors[`teamMember${index}Name`]}</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-gray-300 mb-1 font-mono">Role *</label>
                                  <input
                                    type="text"
                                    value={member.role}
                                    onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white font-mono text-sm ${
                                      errors[`teamMember${index}Role`] ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="e.g., CEO, CTO"
                                  />
                                  {errors[`teamMember${index}Role`] && (
                                    <p className="text-red-400 text-xs mt-1 font-mono">{errors[`teamMember${index}Role`]}</p>
                                  )}
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block text-xs font-semibold text-gray-300 mb-1 font-mono">Bio</label>
                                  <textarea
                                    value={member.bio}
                                    onChange={(e) => handleTeamMemberChange(index, 'bio', e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white font-mono resize-none text-sm"
                                    placeholder="Brief bio..."
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 7: Review */}
                    {currentStep === 7 && (
                      <motion.div
                        key="step7"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="text-lg font-bold text-white font-mono">Review & Launch</h2>
                        </div>
                        
                        <div className="space-y-4">
                          {/* Summary Cards */}
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                              <h3 className="text-sm font-semibold text-cyan-400 mb-2 font-mono">Basic Info</h3>
                              <div className="space-y-1 text-xs">
                                <p><span className="text-gray-400">Name:</span> <span className="text-white">{formData.name}</span></p>
                                <p><span className="text-gray-400">Category:</span> <span className="text-white">{formData.category}</span></p>
                              </div>
                            </div>

                            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                              <h3 className="text-sm font-semibold text-green-400 mb-2 font-mono">Modules</h3>
                              <div className="space-y-1 text-xs">
                                {Object.entries(formData.selectedModules)
                                  .filter(([_, selected]) => selected)
                                  .map(([moduleId, _]) => (
                                    <p key={moduleId}>
                                      <span className="text-green-400">✓</span>{' '}
                                      <span className="text-white capitalize">{moduleId}</span>
                                    </p>
                                  ))}
                              </div>
                            </div>

                            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                              <h3 className="text-sm font-semibold text-purple-400 mb-2 font-mono">Tokenomics</h3>
                              <div className="space-y-1 text-xs">
                                <p><span className="text-gray-400">Token:</span> <span className="text-white">{formData.tokenName} ({formData.tokenSymbol})</span></p>
                                <p><span className="text-gray-400">Supply:</span> <span className="text-white">{formData.totalSupply?.toLocaleString()}</span></p>
                              </div>
                            </div>

                            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                              <h3 className="text-sm font-semibold text-blue-400 mb-2 font-mono">Funding</h3>
                              <div className="space-y-1 text-xs">
                                <p><span className="text-gray-400">Goal:</span> <span className="text-white">${formData.fundingGoal?.toLocaleString()}</span></p>
                                <p><span className="text-gray-400">Min:</span> <span className="text-white">${formData.minInvestment}</span></p>
                              </div>
                            </div>
                          </div>

                          {/* Legal Checkboxes */}
                          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-white mb-3 font-mono">Legal & Compliance</h3>
                            <div className="space-y-3">
                              <label className="flex items-start space-x-3">
                                <input
                                  type="checkbox"
                                  checked={formData.termsAccepted}
                                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                  className="mt-1 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                                />
                                <span className="text-xs text-gray-300">
                                  I agree to the Terms of Service and confirm all information is accurate.
                                </span>
                              </label>
                              
                              <label className="flex items-start space-x-3">
                                <input
                                  type="checkbox"
                                  checked={formData.kycRequired}
                                  onChange={(e) => handleInputChange('kycRequired', e.target.checked)}
                                  className="mt-1 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                                />
                                <span className="text-xs text-gray-300">
                                  Require KYC verification for investors.
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t border-gray-700 mt-6">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    {currentStep < steps.length ? (
                      <button
                        onClick={nextStep}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg transition-all font-semibold font-mono text-sm"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.termsAccepted}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Launching...</span>
                          </>
                        ) : (
                          <>
                            <Rocket className="w-4 h-4" />
                            <span>Launch DAO</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar - Tips */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-900/50 border border-cyan-500/30 rounded-xl backdrop-blur-sm p-4 sticky top-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-3 font-mono">Quick Tips</h3>
                  
                  <div className="space-y-3 text-xs">
                    {currentStep === 1 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Choose a memorable name for your DAO.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Clear description helps attract investors.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 2 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Governance and Treasury are required modules.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Additional modules can be enabled later.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 3 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Token symbol should be 3-5 characters.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Consider token distribution carefully.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 4 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Longer voting allows more participation.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Higher quorum ensures legitimacy.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 5 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Set realistic funding goals.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Consider minimum viable funding.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 6 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-pink-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Include key team members.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Info className="w-3 h-3 text-pink-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Transparency builds confidence.</p>
                        </div>
                      </div>
                    )}
                    
                    {currentStep === 7 && (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Review carefully before launch.</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">Some settings can't be changed.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Progress Summary */}
                  <div className="mt-4 pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-mono">Completion</span>
                      <span className="text-cyan-400 font-mono">{Math.round((currentStep / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDAO;