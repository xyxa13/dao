import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';
import { 
  Rocket, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle, 
  Users, 
  Shield, 
  Zap, 
  TrendingUp,
  Star,
  Globe,
  Target,
  Award,
  DollarSign,
  Settings,
  Eye,
  X,
  Plus,
  Minus,
  AlertCircle,
  Clock,
  Coins,
  Vote,
  Lock,
  Wallet,
  FileText,
  BarChart3,
  UserPlus,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const LaunchDAO = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    category: '',
    description: '',
    website: '',
    
    // Module Selection
    selectedModules: {
      governance: false,
      treasury: false,
      staking: false,
      advancedProposals: false,
      votingExtensions: false,
      membership: false
    },
    
    // Sub-features for each module
    governanceFeatures: {
      tokenWeightedVoting: false,
      quadraticVoting: false,
      delegatedVoting: false
    },
    
    treasuryFeatures: {
      multiSignatureWallet: false,
      streamingPayments: false,
      tokenVesting: false
    },
    
    stakingFeatures: {
      simpleStaking: false,
      liquidityMining: false,
      governanceStaking: false
    },
    
    advancedProposalsFeatures: {
      proposalTemplates: false,
      batchProposals: false,
      timelockProposals: false
    },
    
    votingExtensionsFeatures: {
      snapshotVoting: false,
      weightedVoting: false,
      anonymousVoting: false
    },
    
    membershipFeatures: {
      membershipNFTs: false,
      roleBasedAccess: false,
      reputationSystem: false
    },
    
    // Tokenomics
    tokenName: '',
    tokenSymbol: '',
    totalSupply: '',
    initialPrice: '',
    
    // Governance
    votingPeriod: '7',
    quorumThreshold: '10',
    approvalThreshold: '51',
    proposalDeposit: '100',
    
    // Funding
    fundingGoal: '',
    fundingDuration: '30',
    minInvestment: '10',
    maxInvestment: '10000',
    
    // Team
    teamMembers: [{ name: '', role: '', wallet: '' }],
    
    // Legal
    agreeToTerms: false,
    requireKYC: false
  });

  const steps = [
    { id: 1, name: 'Basic Info', icon: FileText },
    { id: 2, name: 'Module Selection', icon: Settings },
    { id: 3, name: 'Tokenomics', icon: Coins },
    { id: 4, name: 'Governance', icon: Vote },
    { id: 5, name: 'Funding', icon: DollarSign },
    { id: 6, name: 'Team', icon: Users },
    { id: 7, name: 'Review', icon: CheckCircle }
  ];

  const moduleOptions = [
    {
      id: 'governance',
      name: 'Governance',
      description: 'Core governance functionality for proposals and voting',
      icon: Vote,
      color: 'from-cyan-400 to-blue-500',
      required: true,
      features: [
        { id: 'tokenWeightedVoting', name: 'Token Weighted Voting', description: 'Traditional token-based voting power', required: true },
        { id: 'quadraticVoting', name: 'Quadratic Voting', description: 'Quadratic voting to prevent whale dominance' },
        { id: 'delegatedVoting', name: 'Delegated Voting', description: 'Allow token holders to delegate their votes' }
      ]
    },
    {
      id: 'treasury',
      name: 'Treasury',
      description: 'Manage DAO funds and financial operations',
      icon: Wallet,
      color: 'from-green-400 to-emerald-500',
      required: true,
      features: [
        { id: 'multiSignatureWallet', name: 'Multi-Signature Wallet', description: 'Secure treasury with multiple approvers', required: true },
        { id: 'streamingPayments', name: 'Streaming Payments', description: 'Continuous payment streams for contributors' },
        { id: 'tokenVesting', name: 'Token Vesting', description: 'Time-locked token distribution' }
      ]
    },
    {
      id: 'staking',
      name: 'Staking',
      description: 'Token staking and reward distribution system',
      icon: Lock,
      color: 'from-purple-400 to-pink-500',
      features: [
        { id: 'simpleStaking', name: 'Simple Staking', description: 'Basic staking with fixed rewards' },
        { id: 'liquidityMining', name: 'Liquidity Mining', description: 'Rewards for providing liquidity' },
        { id: 'governanceStaking', name: 'Governance Staking', description: 'Stake tokens for voting power' }
      ]
    },
    {
      id: 'advancedProposals',
      name: 'Advanced Proposals',
      description: 'Enhanced proposal templates and management',
      icon: FileText,
      color: 'from-orange-400 to-red-500',
      features: [
        { id: 'proposalTemplates', name: 'Proposal Templates', description: 'Pre-built proposal formats' },
        { id: 'batchProposals', name: 'Batch Proposals', description: 'Submit multiple proposals together' },
        { id: 'timelockProposals', name: 'Timelock Proposals', description: 'Delayed execution for security' }
      ]
    },
    {
      id: 'votingExtensions',
      name: 'Voting Extensions',
      description: 'Advanced voting mechanisms and delegation',
      icon: BarChart3,
      color: 'from-blue-400 to-purple-500',
      features: [
        { id: 'snapshotVoting', name: 'Snapshot Voting', description: 'Off-chain voting with on-chain execution' },
        { id: 'weightedVoting', name: 'Weighted Voting', description: 'Custom voting weight calculations' },
        { id: 'anonymousVoting', name: 'Anonymous Voting', description: 'Private voting mechanisms' }
      ]
    },
    {
      id: 'membership',
      name: 'Membership',
      description: 'Member management and role-based governance',
      icon: Users,
      color: 'from-pink-400 to-red-500',
      features: [
        { id: 'membershipNFTs', name: 'Membership NFTs', description: 'NFT-based membership system' },
        { id: 'roleBasedAccess', name: 'Role-Based Access', description: 'Different access levels for members' },
        { id: 'reputationSystem', name: 'Reputation System', description: 'Member reputation and scoring' }
      ]
    }
  ];

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Basic Info
        if (!formData.name.trim()) newErrors.name = 'DAO name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
        
      case 2: // Module Selection
        // Check if required modules are selected
        if (!formData.selectedModules.governance) {
          newErrors.governance = 'Governance module is required';
        } else {
          // Check if at least one governance feature is selected
          const govFeatures = Object.values(formData.governanceFeatures);
          if (!govFeatures.some(feature => feature)) {
            newErrors.governanceFeatures = 'At least one governance feature is required';
          }
        }
        
        if (!formData.selectedModules.treasury) {
          newErrors.treasury = 'Treasury module is required';
        } else {
          // Check if at least one treasury feature is selected
          const treasuryFeatures = Object.values(formData.treasuryFeatures);
          if (!treasuryFeatures.some(feature => feature)) {
            newErrors.treasuryFeatures = 'At least one treasury feature is required';
          }
        }
        break;
        
      case 3: // Tokenomics
        if (!formData.tokenName.trim()) newErrors.tokenName = 'Token name is required';
        if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required';
        if (!formData.totalSupply) newErrors.totalSupply = 'Total supply is required';
        if (!formData.initialPrice) newErrors.initialPrice = 'Initial price is required';
        break;
        
      case 4: // Governance
        if (!formData.votingPeriod) newErrors.votingPeriod = 'Voting period is required';
        if (!formData.quorumThreshold) newErrors.quorumThreshold = 'Quorum threshold is required';
        if (!formData.approvalThreshold) newErrors.approvalThreshold = 'Approval threshold is required';
        break;
        
      case 5: // Funding
        if (!formData.fundingGoal) newErrors.fundingGoal = 'Funding goal is required';
        if (!formData.fundingDuration) newErrors.fundingDuration = 'Funding duration is required';
        break;
        
      case 6: // Team
        if (formData.teamMembers.length === 0 || !formData.teamMembers[0].name.trim()) {
          newErrors.teamMembers = 'At least one team member is required';
        }
        break;
        
      case 7: // Review
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleModuleToggle = (moduleId) => {
    setFormData(prev => ({
      ...prev,
      selectedModules: {
        ...prev.selectedModules,
        [moduleId]: !prev.selectedModules[moduleId]
      }
    }));
  };

  const handleFeatureToggle = (moduleId, featureId) => {
    const featureKey = `${moduleId}Features`;
    setFormData(prev => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        [featureId]: !prev[featureKey][featureId]
      }
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: '', wallet: '' }]
    }));
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const updateTeamMember = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const handleSubmit = () => {
    if (validateStep(7)) {
      // Handle form submission
      console.log('DAO Creation Data:', formData);
      alert('DAO created successfully!');
      setShowForm(false);
      navigate('/dashboard');
    }
  };

  // Landing page content
  if (!showForm) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <BackgroundParticles />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-24 sm:pt-28">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                LAUNCH YOUR DAO
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Create a decentralized autonomous organization in minutes with our comprehensive platform. 
              Build the future of governance, one DAO at a time.
            </p>
            
            <motion.button
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center">
                <Rocket className="mr-2 w-5 h-5" />
                START BUILDING
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: Rocket, label: 'DAOs Launched', value: '250+' },
              { icon: DollarSign, label: 'Total Funding', value: '$50M+' },
              { icon: Users, label: 'Active Members', value: '25K+' },
              { icon: Target, label: 'Success Rate', value: '94%' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm text-center"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 font-mono">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                WHY CHOOSE DAOVERSE?
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Deploy your DAO in minutes, not weeks. Our streamlined process gets you up and running quickly.'
                },
                {
                  icon: Shield,
                  title: 'Battle Tested',
                  description: 'Built on Internet Computer with enterprise-grade security and proven smart contract architecture.'
                },
                {
                  icon: TrendingUp,
                  title: 'Growth Focused',
                  description: 'Advanced analytics and growth tools to help your DAO succeed and scale effectively.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-mono">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-white mb-4 font-mono">
                Ready to Build the Future?
              </h3>
              <p className="text-xl text-gray-300 mb-8 font-mono">
                Join thousands of innovators creating the next generation of decentralized organizations.
              </p>
              <motion.button
                onClick={() => setShowForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-2 w-5 h-5" />
                  CREATE YOUR DAO NOW
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Form content
  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen bg-black text-white relative">
        <BackgroundParticles />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono">Back to Launch</span>
            </button>
            
            <h1 className="text-2xl font-bold text-white font-mono">CREATE DAO</h1>
            
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors font-mono"
            >
              <Eye className="w-4 h-4 inline mr-2" />
              PREVIEW
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-400 font-mono">Progress</span>
              <span className="text-sm font-semibold text-cyan-400 font-mono">{currentStep}/7</span>
            </div>
            
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep >= step.id
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mt-2 transition-all ${
                      currentStep > step.id ? 'bg-cyan-500' : 'bg-gray-700'
                    }`} />
                  )}
                  
                  <span className={`text-xs mt-2 font-mono text-center ${
                    currentStep >= step.id ? 'text-cyan-400' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl backdrop-blur-sm p-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-mono">Basic Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      DAO Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.name ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter DAO name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1 font-mono">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.category ? 'border-red-500' : 'border-gray-600'
                      }`}
                    >
                      <option value="">Select category</option>
                      <option value="defi">DeFi</option>
                      <option value="nft">NFT</option>
                      <option value="gaming">Gaming</option>
                      <option value="social">Social</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.category && <p className="text-red-400 text-sm mt-1 font-mono">{errors.category}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2 font-mono">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                      errors.description ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Describe your DAO's mission and goals"
                  />
                  {errors.description && <p className="text-red-400 text-sm mt-1 font-mono">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2 font-mono">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="https://your-dao.com"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Module Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-mono">Module Selection</h2>
                
                {/* Error Messages */}
                {(errors.governance || errors.treasury || errors.governanceFeatures || errors.treasuryFeatures) && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-red-400 font-mono text-sm">Please fix the following errors:</span>
                    </div>
                    <ul className="mt-2 text-red-400 text-sm font-mono list-disc list-inside">
                      {errors.governance && <li>{errors.governance}</li>}
                      {errors.treasury && <li>{errors.treasury}</li>}
                      {errors.governanceFeatures && <li>{errors.governanceFeatures}</li>}
                      {errors.treasuryFeatures && <li>{errors.treasuryFeatures}</li>}
                    </ul>
                  </div>
                )}
                
                <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                  {moduleOptions.map((module) => (
                    <div key={module.id} className="space-y-3">
                      {/* Module Header */}
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.selectedModules[module.id]
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                        } ${module.required ? 'ring-2 ring-orange-500/30' : ''}`}
                        onClick={() => !module.required && handleModuleToggle(module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                              <module.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white font-mono flex items-center">
                                {module.name}
                                {module.required && <span className="ml-2 text-orange-400 text-sm">(Required)</span>}
                              </h3>
                              <p className="text-gray-400 text-sm">{module.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {module.required ? (
                              <div className="w-6 h-6 bg-orange-500 rounded border-2 border-orange-500 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className={`w-6 h-6 rounded border-2 transition-all ${
                                formData.selectedModules[module.id]
                                  ? 'bg-cyan-500 border-cyan-500'
                                  : 'border-gray-400'
                              }`}>
                                {formData.selectedModules[module.id] && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Module Features */}
                      {(formData.selectedModules[module.id] || module.required) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="ml-6 space-y-2"
                        >
                          {module.features.map((feature) => (
                            <div
                              key={feature.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                formData[`${module.id}Features`][feature.id]
                                  ? 'border-purple-500 bg-purple-500/10'
                                  : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                              } ${feature.required ? 'ring-1 ring-orange-500/30' : ''}`}
                              onClick={() => handleFeatureToggle(module.id, feature.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-white font-medium font-mono flex items-center">
                                    {feature.name}
                                    {feature.required && <span className="ml-2 text-orange-400 text-xs">(Required)</span>}
                                  </h4>
                                  <p className="text-gray-400 text-sm">{feature.description}</p>
                                </div>
                                
                                <div className={`w-5 h-5 rounded border-2 transition-all ${
                                  formData[`${module.id}Features`][feature.id]
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-gray-400'
                                }`}>
                                  {formData[`${module.id}Features`][feature.id] && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Tokenomics */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-mono">Tokenomics</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Token Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.tokenName}
                      onChange={(e) => setFormData(prev => ({ ...prev, tokenName: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.tokenName ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="e.g., MyDAO Token"
                    />
                    {errors.tokenName && <p className="text-red-400 text-sm mt-1 font-mono">{errors.tokenName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Token Symbol <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.tokenSymbol}
                      onChange={(e) => setFormData(prev => ({ ...prev, tokenSymbol: e.target.value.toUpperCase() }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.tokenSymbol ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="e.g., MDT"
                      maxLength={6}
                    />
                    {errors.tokenSymbol && <p className="text-red-400 text-sm mt-1 font-mono">{errors.tokenSymbol}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Total Supply <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.totalSupply}
                      onChange={(e) => setFormData(prev => ({ ...prev, totalSupply: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.totalSupply ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="1000000"
                    />
                    {errors.totalSupply && <p className="text-red-400 text-sm mt-1 font-mono">{errors.totalSupply}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Initial Price (USD) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.initialPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, initialPrice: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.initialPrice ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="0.10"
                    />
                    {errors.initialPrice && <p className="text-red-400 text-sm mt-1 font-mono">{errors.initialPrice}</p>}
                  </div>
                </div>

                {/* Market Cap Display */}
                {formData.totalSupply && formData.initialPrice && (
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <h3 className="text-cyan-400 font-semibold mb-2 font-mono">Calculated Market Cap</h3>
                    <p className="text-2xl font-bold text-white font-mono">
                      ${(parseFloat(formData.totalSupply) * parseFloat(formData.initialPrice)).toLocaleString()}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Governance */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-mono">Governance Parameters</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Voting Period (days) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.votingPeriod}
                      onChange={(e) => setFormData(prev => ({ ...prev, votingPeriod: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.votingPeriod ? 'border-red-500' : 'border-gray-600'
                      }`}
                      min="1"
                      max="30"
                    />
                    {errors.votingPeriod && <p className="text-red-400 text-sm mt-1 font-mono">{errors.votingPeriod}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Quorum Threshold (%) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.quorumThreshold}
                      onChange={(e) => setFormData(prev => ({ ...prev, quorumThreshold: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.quorumThreshold ? 'border-red-500' : 'border-gray-600'
                      }`}
                      min="1"
                      max="100"
                    />
                    {errors.quorumThreshold && <p className="text-red-400 text-sm mt-1 font-mono">{errors.quorumThreshold}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Approval Threshold (%) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.approvalThreshold}
                      onChange={(e) => setFormData(prev => ({ ...prev, approvalThreshold: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.approvalThreshold ? 'border-red-500' : 'border-gray-600'
                      }`}
                      min="1"
                      max="100"
                    />
                    {errors.approvalThreshold && <p className="text-red-400 text-sm mt-1 font-mono">{errors.approvalThreshold}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">Proposal Deposit</label>
                    <input
                      type="number"
                      value={formData.proposalDeposit}
                      onChange={(e) => setFormData(prev => ({ ...prev, proposalDeposit: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                      placeholder="100"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Funding */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-mono">Funding Configuration</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Funding Goal (USD) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.fundingGoal}
                      onChange={(e) => setFormData(prev => ({ ...prev, fundingGoal: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.fundingGoal ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="100000"
                    />
                    {errors.fundingGoal && <p className="text-red-400 text-sm mt-1 font-mono">{errors.fundingGoal}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">
                      Funding Duration (days) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.fundingDuration}
                      onChange={(e) => setFormData(prev => ({ ...prev, fundingDuration: e.target.value }))}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono ${
                        errors.fundingDuration ? 'border-red-500' : 'border-gray-600'
                      }`}
                      min="1"
                      max="365"
                    />
                    {errors.fundingDuration && <p className="text-red-400 text-sm mt-1 font-mono">{errors.fundingDuration}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">Minimum Investment (USD)</label>
                    <input
                      type="number"
                      value={formData.minInvestment}
                      onChange={(e) => setFormData(prev => ({ ...prev, minInvestment: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-mono">Maximum Investment (USD)</label>
                    <input
                      type="number"
                      value={formData.maxInvestment}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxInvestment: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                      placeholder="10000"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Team */}
            {currentStep === 6 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white font-mono">Team Members</h2>
                  <button
                    onClick={addTeamMember}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors font-mono"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Member</span>
                  </button>
                </div>

                {errors.teamMembers && (
                  <p className="text-red-400 text-sm font-mono">{errors.teamMembers}</p>
                )}
                
                <div className="space-y-4">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold font-mono">
                          Team Member {index + 1}
                          {index === 0 && <span className="text-red-400 ml-1">*</span>}
                        </h3>
                        {index > 0 && (
                          <button
                            onClick={() => removeTeamMember(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2 font-mono">
                            Name {index === 0 && <span className="text-red-400">*</span>}
                          </label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                            placeholder="Full name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2 font-mono">Role</label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                            placeholder="e.g., CEO, CTO"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-white mb-2 font-mono">Wallet Address</label>
                          <input
                            type="text"
                            value={member.wallet}
                            onChange={(e) => updateTeamMember(index, 'wallet', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                            placeholder="0x..."
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-mono">Review & Launch</h2>
                
                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                    <h3 className="text-cyan-400 font-semibold mb-4 font-mono">DAO OVERVIEW</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Name:</span>
                        <span className="text-white font-mono">{formData.name || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Category:</span>
                        <span className="text-white font-mono">{formData.category || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Token:</span>
                        <span className="text-white font-mono">{formData.tokenSymbol || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Supply:</span>
                        <span className="text-white font-mono">{formData.totalSupply ? parseInt(formData.totalSupply).toLocaleString() : 'Not set'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-purple-400 font-semibold mb-4 font-mono">GOVERNANCE</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Voting Period:</span>
                        <span className="text-white font-mono">{formData.votingPeriod} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Quorum:</span>
                        <span className="text-white font-mono">{formData.quorumThreshold}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Approval:</span>
                        <span className="text-white font-mono">{formData.approvalThreshold}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Modules:</span>
                        <span className="text-white font-mono">{Object.values(formData.selectedModules).filter(Boolean).length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-green-400 font-semibold mb-4 font-mono">FUNDING</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Goal:</span>
                        <span className="text-white font-mono">${formData.fundingGoal ? parseInt(formData.fundingGoal).toLocaleString() : 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Duration:</span>
                        <span className="text-white font-mono">{formData.fundingDuration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Min Investment:</span>
                        <span className="text-white font-mono">${formData.minInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Max Investment:</span>
                        <span className="text-white font-mono">${formData.maxInvestment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-orange-500/30 rounded-lg p-6">
                    <h3 className="text-orange-400 font-semibold mb-4 font-mono">TEAM</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-mono">Members:</span>
                        <span className="text-white font-mono">{formData.teamMembers.length}</span>
                      </div>
                      <div className="space-y-1">
                        {formData.teamMembers.slice(0, 3).map((member, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-gray-400 font-mono">{member.role || 'Member'}:</span>
                            <span className="text-white font-mono">{member.name || 'Not set'}</span>
                          </div>
                        ))}
                        {formData.teamMembers.length > 3 && (
                          <div className="text-gray-400 font-mono text-xs">
                            +{formData.teamMembers.length - 3} more members
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal & Compliance */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 font-mono flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    LEGAL & COMPLIANCE
                  </h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded transition-all ${
                          formData.agreeToTerms 
                            ? 'bg-cyan-500 border-cyan-500' 
                            : errors.agreeToTerms 
                            ? 'border-red-500' 
                            : 'border-gray-400'
                        }`}>
                          {formData.agreeToTerms && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-white font-mono">
                          I agree to the Terms of Service and confirm all information is accurate. <span className="text-red-400">*</span>
                        </span>
                        {errors.agreeToTerms && (
                          <p className="text-red-400 text-sm mt-1 font-mono">{errors.agreeToTerms}</p>
                        )}
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.requireKYC}
                          onChange={(e) => setFormData(prev => ({ ...prev, requireKYC: e.target.checked }))}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 border-2 rounded transition-all ${
                          formData.requireKYC ? 'bg-cyan-500 border-cyan-500' : 'border-gray-400'
                        }`}>
                          {formData.requireKYC && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-white font-mono">
                        Require KYC verification for investors.
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-700">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep === 7 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg transition-all font-semibold font-mono"
                >
                  <Rocket className="w-4 h-4" />
                  <span>LAUNCH DAO</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg transition-all font-semibold font-mono"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-900 border border-cyan-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white font-mono">DAO PREVIEW</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 space-y-8">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">BASIC INFORMATION</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400 font-mono">Name:</span>
                          <span className="text-white font-mono ml-2">{formData.name || 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Category:</span>
                          <span className="text-white font-mono ml-2">{formData.category || 'Not set'}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-gray-400 font-mono">Description:</span>
                          <p className="text-white font-mono mt-1">{formData.description || 'Not set'}</p>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Website:</span>
                          <span className="text-white font-mono ml-2">{formData.website || 'Not set'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selected Modules */}
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-4 font-mono">SELECTED MODULES & FEATURES</h3>
                    <div className="space-y-4">
                      {moduleOptions.map((module) => {
                        const isSelected = formData.selectedModules[module.id] || module.required;
                        if (!isSelected) return null;
                        
                        const selectedFeatures = Object.entries(formData[`${module.id}Features`])
                          .filter(([_, selected]) => selected)
                          .map(([featureId, _]) => {
                            const feature = module.features.find(f => f.id === featureId);
                            return feature?.name;
                          })
                          .filter(Boolean);

                        return (
                          <div key={module.id} className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                                <module.icon className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="text-white font-semibold font-mono">{module.name}</h4>
                              {module.required && <span className="text-orange-400 text-sm font-mono">(Required)</span>}
                            </div>
                            {selectedFeatures.length > 0 && (
                              <div className="ml-11">
                                <p className="text-gray-400 text-sm font-mono mb-2">Selected Features:</p>
                                <div className="flex flex-wrap gap-2">
                                  {selectedFeatures.map((feature, index) => (
                                    <span key={index} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30 font-mono">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tokenomics */}
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-4 font-mono">TOKENOMICS</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400 font-mono">Token Name:</span>
                          <span className="text-white font-mono ml-2">{formData.tokenName || 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Symbol:</span>
                          <span className="text-white font-mono ml-2">{formData.tokenSymbol || 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Total Supply:</span>
                          <span className="text-white font-mono ml-2">{formData.totalSupply ? parseInt(formData.totalSupply).toLocaleString() : 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Initial Price:</span>
                          <span className="text-white font-mono ml-2">${formData.initialPrice || 'Not set'}</span>
                        </div>
                        {formData.totalSupply && formData.initialPrice && (
                          <div className="md:col-span-2">
                            <span className="text-gray-400 font-mono">Market Cap:</span>
                            <span className="text-green-400 font-mono ml-2 font-bold">
                              ${(parseFloat(formData.totalSupply) * parseFloat(formData.initialPrice)).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Governance */}
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-4 font-mono">GOVERNANCE PARAMETERS</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400 font-mono">Voting Period:</span>
                          <span className="text-white font-mono ml-2">{formData.votingPeriod} days</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Quorum Threshold:</span>
                          <span className="text-white font-mono ml-2">{formData.quorumThreshold}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Approval Threshold:</span>
                          <span className="text-white font-mono ml-2">{formData.approvalThreshold}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Proposal Deposit:</span>
                          <span className="text-white font-mono ml-2">{formData.proposalDeposit} tokens</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Funding */}
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-4 font-mono">FUNDING DETAILS</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400 font-mono">Funding Goal:</span>
                          <span className="text-white font-mono ml-2">${formData.fundingGoal ? parseInt(formData.fundingGoal).toLocaleString() : 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Duration:</span>
                          <span className="text-white font-mono ml-2">{formData.fundingDuration} days</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Min Investment:</span>
                          <span className="text-white font-mono ml-2">${formData.minInvestment}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-mono">Max Investment:</span>
                          <span className="text-white font-mono ml-2">${formData.maxInvestment}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-400 mb-4 font-mono">TEAM MEMBERS</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="space-y-3">
                        {formData.teamMembers.map((member, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                            <div>
                              <span className="text-white font-mono">{member.name || `Member ${index + 1}`}</span>
                              {member.role && <span className="text-gray-400 font-mono ml-2">({member.role})</span>}
                            </div>
                            {member.wallet && (
                              <code className="text-cyan-400 text-xs font-mono">
                                {member.wallet.slice(0, 6)}...{member.wallet.slice(-4)}
                              </code>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Legal & Compliance */}
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4 font-mono">LEGAL & COMPLIANCE</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded ${formData.agreeToTerms ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-white font-mono">Terms of Service Agreement</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded ${formData.requireKYC ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-white font-mono">KYC Verification Required</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Launch Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">LAUNCH SUMMARY</h3>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-cyan-400 font-mono">
                            {Object.values(formData.selectedModules).filter(Boolean).length}
                          </div>
                          <div className="text-gray-400 text-sm font-mono">Modules Selected</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400 font-mono">
                            {formData.teamMembers.length}
                          </div>
                          <div className="text-gray-400 text-sm font-mono">Team Members</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400 font-mono">
                            ${formData.fundingGoal ? parseInt(formData.fundingGoal).toLocaleString() : '0'}
                          </div>
                          <div className="text-gray-400 text-sm font-mono">Funding Goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LaunchDAO;