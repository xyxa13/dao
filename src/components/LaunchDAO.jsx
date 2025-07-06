import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';
import { 
  Rocket, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  Star,
  CheckCircle,
  Globe,
  DollarSign,
  Target,
  Award,
  Clock,
  BarChart3,
  Settings,
  Sparkles,
  Plus,
  Code,
  Lock,
  Coins,
  Vote,
  PieChart,
  Building,
  Briefcase,
  Heart,
  Gamepad2,
  Palette,
  Music,
  Camera,
  Cpu,
  Leaf
} from 'lucide-react';

const LaunchDAO = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'Built on Internet Computer with full transparency and security',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Deploy your DAO in minutes, not weeks',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built-in governance and community management tools',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Growth Focused',
      description: 'Advanced analytics and growth tracking tools',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const stats = [
    { label: 'DAOs Launched', value: '250+', icon: Rocket },
    { label: 'Total Funding', value: '$50M+', icon: DollarSign },
    { label: 'Active Members', value: '25K+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: Target }
  ];

  const templates = [
    {
      id: 'defi',
      name: 'DeFi Protocol',
      description: 'Launch a decentralized finance protocol with advanced treasury management',
      icon: DollarSign,
      color: 'from-green-400 to-emerald-500',
      features: ['Treasury Management', 'Yield Farming', 'Liquidity Mining', 'Governance Tokens'],
      estimatedTime: '2-3 weeks',
      complexity: 'Advanced'
    },
    {
      id: 'investment',
      name: 'Investment DAO',
      description: 'Create a collective investment vehicle for your community',
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      features: ['Portfolio Management', 'Voting System', 'Fund Allocation', 'Performance Tracking'],
      estimatedTime: '1-2 weeks',
      complexity: 'Intermediate'
    },
    {
      id: 'social',
      name: 'Social DAO',
      description: 'Build a community-driven organization with social features',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      features: ['Member Management', 'Social Features', 'Event Planning', 'Reputation System'],
      estimatedTime: '1 week',
      complexity: 'Beginner'
    },
    {
      id: 'gaming',
      name: 'Gaming Guild',
      description: 'Create a gaming-focused DAO with NFT and reward systems',
      icon: Gamepad2,
      color: 'from-orange-400 to-red-500',
      features: ['NFT Integration', 'Reward System', 'Tournament Management', 'Asset Trading'],
      estimatedTime: '2-3 weeks',
      complexity: 'Advanced'
    },
    {
      id: 'creator',
      name: 'Creator DAO',
      description: 'Support creators with funding and community management',
      icon: Palette,
      color: 'from-pink-400 to-rose-500',
      features: ['Creator Support', 'Content Monetization', 'Fan Engagement', 'Royalty Distribution'],
      estimatedTime: '1-2 weeks',
      complexity: 'Intermediate'
    },
    {
      id: 'research',
      name: 'Research DAO',
      description: 'Fund and coordinate research projects with transparent governance',
      icon: Code,
      color: 'from-indigo-400 to-purple-500',
      features: ['Grant Management', 'Peer Review', 'Publication System', 'Research Funding'],
      estimatedTime: '2 weeks',
      complexity: 'Intermediate'
    }
  ];

  const handleLaunchClick = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setShowForm(true);
  };

  if (showForm) {
    return <LaunchDAOForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <BackgroundParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-24 sm:pt-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Rocket className="w-12 h-12 text-cyan-400 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                LAUNCH DAO
              </span>
            </h1>
            <Sparkles className="w-12 h-12 text-purple-400 ml-4" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 font-mono">
            > Create your decentralized autonomous organization in minutes with our advanced platform
          </p>

          <motion.button
            onClick={handleLaunchClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center">
              <Rocket className="mr-2 w-5 h-5" />
              {isAuthenticated ? 'START BUILDING' : 'CONNECT TO START'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm text-center"
            >
              <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                PLATFORM FEATURES
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
              > Everything you need to build and manage a successful DAO
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-mono">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                DAO TEMPLATES
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
              > Choose from pre-built templates or create your own custom DAO
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center`}>
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded-full font-mono ${
                      template.complexity === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      template.complexity === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {template.complexity}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-mono">{template.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{template.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-gray-500">ESTIMATED TIME</span>
                    <span className="text-cyan-400">{template.estimatedTime}</span>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-mono">INCLUDED FEATURES</p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-md border border-cyan-500/30 font-mono"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLaunchClick}
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-all font-semibold font-mono"
                >
                  USE TEMPLATE
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono">
                READY TO{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  REVOLUTIONIZE?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-mono">
                > Join the future of decentralized organizations. Launch your DAO today.
              </p>
              <button
                onClick={handleLaunchClick}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Rocket className="mr-2 w-5 h-5 relative z-10" />
                <span className="relative z-10">START YOUR DAO JOURNEY</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Separate LaunchDAOForm Component
const LaunchDAOForm = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    category: '',
    description: '',
    website: '',
    
    // Module Selection
    selectedModules: {
      governance: {
        selected: true,
        features: {
          tokenWeightedVoting: true,
          quadraticVoting: false,
          delegatedVoting: false,
          timeLockedVoting: false
        }
      },
      treasury: {
        selected: true,
        features: {
          multiSigWallet: true,
          streamingPayments: false,
          tokenVesting: false,
          budgetManagement: false
        }
      },
      staking: {
        selected: false,
        features: {
          simpleStaking: false,
          liquidityMining: false,
          governanceStaking: false,
          rewardDistribution: false
        }
      },
      analytics: {
        selected: false,
        features: {
          analyticsDashboard: false,
          alertSystem: false,
          financialReports: false,
          performanceMetrics: false
        }
      }
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
    fundingDuration: '30',
    minInvestment: '',
    maxInvestment: '',
    
    // Team
    teamMembers: [{ name: '', role: '', bio: '', wallet: '' }],
    
    // Legal
    termsAccepted: false,
    kycRequired: false
  });

  const steps = [
    { id: 1, name: 'Basic Info', icon: '📝' },
    { id: 2, name: 'Module Selection', icon: '🧩' },
    { id: 3, name: 'Tokenomics', icon: '💰' },
    { id: 4, name: 'Governance', icon: '🗳️' },
    { id: 5, name: 'Funding', icon: '🎯' },
    { id: 6, name: 'Team', icon: '👥' },
    { id: 7, name: 'Review', icon: '✅' }
  ];

  const modules = {
    governance: {
      name: 'Governance',
      icon: Vote,
      color: 'from-cyan-400 to-blue-500',
      required: true,
      description: 'Core governance functionality for proposals and voting',
      features: {
        tokenWeightedVoting: { name: 'Token Weighted Voting', description: 'Traditional token-based voting power', required: true },
        quadraticVoting: { name: 'Quadratic Voting', description: 'Quadratic voting to prevent whale dominance', required: false },
        delegatedVoting: { name: 'Delegated Voting', description: 'Allow token holders to delegate their votes', required: false },
        timeLockedVoting: { name: 'Time-Locked Voting', description: 'Require tokens to be locked during voting', required: false }
      }
    },
    treasury: {
      name: 'Treasury',
      icon: DollarSign,
      color: 'from-green-400 to-emerald-500',
      required: true,
      description: 'Manage DAO funds and financial operations',
      features: {
        multiSigWallet: { name: 'Multi-Signature Wallet', description: 'Secure treasury with multiple approvers', required: true },
        streamingPayments: { name: 'Streaming Payments', description: 'Continuous payment streams for contributors', required: false },
        tokenVesting: { name: 'Token Vesting', description: 'Time-locked token distribution', required: false },
        budgetManagement: { name: 'Budget Management', description: 'Advanced budget planning and tracking', required: false }
      }
    },
    staking: {
      name: 'Staking',
      icon: Coins,
      color: 'from-purple-400 to-pink-500',
      required: false,
      description: 'Token staking and reward distribution system',
      features: {
        simpleStaking: { name: 'Simple Staking', description: 'Basic staking with fixed rewards', required: false },
        liquidityMining: { name: 'Liquidity Mining', description: 'Rewards for providing liquidity', required: false },
        governanceStaking: { name: 'Governance Staking', description: 'Stake tokens for voting power', required: false },
        rewardDistribution: { name: 'Reward Distribution', description: 'Automated reward distribution system', required: false }
      }
    },
    analytics: {
      name: 'Analytics',
      icon: BarChart3,
      color: 'from-orange-400 to-red-500',
      required: false,
      description: 'Monitoring and reporting tools',
      features: {
        analyticsDashboard: { name: 'Analytics Dashboard', description: 'Real-time DAO metrics and KPIs', required: false },
        alertSystem: { name: 'Alert System', description: 'Automated notifications for key events', required: false },
        financialReports: { name: 'Financial Reports', description: 'Comprehensive financial reporting', required: false },
        performanceMetrics: { name: 'Performance Metrics', description: 'Track DAO performance over time', required: false }
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleToggle = (moduleKey) => {
    if (modules[moduleKey].required) return; // Can't toggle required modules
    
    setFormData(prev => ({
      ...prev,
      selectedModules: {
        ...prev.selectedModules,
        [moduleKey]: {
          ...prev.selectedModules[moduleKey],
          selected: !prev.selectedModules[moduleKey].selected
        }
      }
    }));
  };

  const handleFeatureToggle = (moduleKey, featureKey) => {
    const feature = modules[moduleKey].features[featureKey];
    if (feature.required) return; // Can't toggle required features
    
    setFormData(prev => ({
      ...prev,
      selectedModules: {
        ...prev.selectedModules,
        [moduleKey]: {
          ...prev.selectedModules[moduleKey],
          features: {
            ...prev.selectedModules[moduleKey].features,
            [featureKey]: !prev.selectedModules[moduleKey].features[featureKey]
          }
        }
      }
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', role: '', bio: '', wallet: '' }]
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

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const getSelectedModulesCount = () => {
    return Object.values(formData.selectedModules).filter(module => module.selected).length;
  };

  const getSelectedFeaturesCount = () => {
    return Object.values(formData.selectedModules).reduce((total, module) => {
      if (module.selected) {
        return total + Object.values(module.features).filter(Boolean).length;
      }
      return total;
    }, 0);
  };

  const calculateMarketCap = () => {
    const supply = parseFloat(formData.totalSupply) || 0;
    const price = parseFloat(formData.initialPrice) || 0;
    return supply * price;
  };

  const PreviewModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowPreview(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-mono">DAO PREVIEW</h2>
          <button
            onClick={() => setShowPreview(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Info Preview */}
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">BASIC INFORMATION</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm font-mono">NAME</p>
                <p className="text-white font-semibold">{formData.name || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-mono">CATEGORY</p>
                <p className="text-white font-semibold">{formData.category || 'Not specified'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-400 text-sm font-mono">DESCRIPTION</p>
                <p className="text-white">{formData.description || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-mono">WEBSITE</p>
                <p className="text-cyan-400">{formData.website || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Modules Preview */}
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">SELECTED MODULES</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(formData.selectedModules).map(([key, module]) => {
                if (!module.selected) return null;
                const moduleInfo = modules[key];
                return (
                  <div key={key} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <moduleInfo.icon className="w-5 h-5 text-cyan-400 mr-2" />
                      <span className="font-semibold text-white">{moduleInfo.name}</span>
                      {moduleInfo.required && (
                        <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {Object.entries(module.features).map(([featureKey, enabled]) => {
                        if (!enabled) return null;
                        const feature = moduleInfo.features[featureKey];
                        return (
                          <div key={featureKey} className="flex items-center text-sm">
                            <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                            <span className="text-gray-300">{feature.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tokenomics Preview */}
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">TOKENOMICS</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm font-mono">TOKEN NAME</p>
                <p className="text-white font-semibold">{formData.tokenName || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-mono">SYMBOL</p>
                <p className="text-white font-semibold">{formData.tokenSymbol || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-mono">TOTAL SUPPLY</p>
                <p className="text-white font-semibold">{formData.totalSupply ? Number(formData.totalSupply).toLocaleString() : 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-mono">INITIAL PRICE</p>
                <p className="text-white font-semibold">{formData.initialPrice ? `$${formData.initialPrice}` : 'Not specified'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-400 text-sm font-mono">ESTIMATED MARKET CAP</p>
                <p className="text-green-400 font-semibold text-lg">
                  ${calculateMarketCap().toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Team Preview */}
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">TEAM MEMBERS</h3>
            <div className="space-y-3">
              {formData.teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{member.name || `Team Member ${index + 1}`}</p>
                      <p className="text-cyan-400 text-sm">{member.role || 'Role not specified'}</p>
                    </div>
                  </div>
                  {member.bio && (
                    <p className="text-gray-300 text-sm mt-2">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => setShowPreview(false)}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-mono"
          >
            CLOSE PREVIEW
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-24 sm:pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span className="font-mono">Back to Launch</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-cyan-400 font-mono text-sm">
                {getSelectedModulesCount()} modules, {getSelectedFeaturesCount()} features selected
              </div>
              <button
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors font-mono"
              >
                PREVIEW DAO
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 font-mono">
                CREATE YOUR DAO
              </h1>
              <p className="text-cyan-400 font-mono">
                > Step {currentStep} of {steps.length}: {steps.find(s => s.id === currentStep)?.name}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold font-mono">Progress</span>
              <span className="text-cyan-400 font-mono">{currentStep}/{steps.length}</span>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.id <= currentStep 
                      ? 'bg-cyan-500 border-cyan-500 text-white' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {step.id < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-1 mt-2 transition-all ${
                      step.id < currentStep ? 'bg-cyan-500' : 'bg-gray-600'
                    }`} style={{ width: '100px' }} />
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Names Below Progress Bar */}
            <div className="flex items-center justify-between">
              {steps.map((step) => (
                <div key={step.id} className="text-center" style={{ width: '100px' }}>
                  <span className={`text-xs font-mono ${
                    step.id <= currentStep ? 'text-cyan-400' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gray-900/50 border border-cyan-500/30 rounded-xl backdrop-blur-sm p-8"
        >
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">BASIC INFORMATION</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">DAO Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="Enter your DAO name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                  >
                    <option value="">Select category</option>
                    <option value="defi">DeFi Protocol</option>
                    <option value="investment">Investment DAO</option>
                    <option value="social">Social DAO</option>
                    <option value="gaming">Gaming Guild</option>
                    <option value="creator">Creator DAO</option>
                    <option value="research">Research DAO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                  placeholder="Describe your DAO's mission and goals..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Website (Optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                  placeholder="https://your-dao-website.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Module Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">MODULE SELECTION</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Main Modules */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">Select Modules</h3>
                  <div className="space-y-4">
                    {Object.entries(modules).map(([key, module]) => (
                      <div
                        key={key}
                        className={`border rounded-lg p-4 transition-all cursor-pointer ${
                          formData.selectedModules[key].selected
                            ? 'border-cyan-500/50 bg-cyan-500/10'
                            : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                        } ${module.required ? 'opacity-75' : ''}`}
                        onClick={() => !module.required && handleModuleToggle(key)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <module.icon className="w-6 h-6 text-cyan-400" />
                            <div>
                              <h4 className="font-semibold text-white font-mono">{module.name}</h4>
                              <p className="text-gray-400 text-sm">{module.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {module.required && (
                              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded font-mono">
                                Required
                              </span>
                            )}
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              formData.selectedModules[key].selected
                                ? 'border-cyan-500 bg-cyan-500'
                                : 'border-gray-600'
                            }`}>
                              {formData.selectedModules[key].selected && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Features */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-mono">Configure Features</h3>
                  <div className="space-y-4">
                    {Object.entries(modules).map(([moduleKey, module]) => {
                      if (!formData.selectedModules[moduleKey].selected) return null;
                      
                      return (
                        <div key={moduleKey} className="border border-gray-600 rounded-lg p-4 bg-gray-800/30">
                          <div className="flex items-center space-x-2 mb-3">
                            <module.icon className="w-5 h-5 text-cyan-400" />
                            <h4 className="font-semibold text-white font-mono">{module.name}</h4>
                          </div>
                          <div className="space-y-2">
                            {Object.entries(module.features).map(([featureKey, feature]) => (
                              <div
                                key={featureKey}
                                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all ${
                                  formData.selectedModules[moduleKey].features[featureKey]
                                    ? 'bg-cyan-500/10 border border-cyan-500/30'
                                    : 'hover:bg-gray-700/50'
                                } ${feature.required ? 'opacity-75' : ''}`}
                                onClick={() => !feature.required && handleFeatureToggle(moduleKey, featureKey)}
                              >
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-white text-sm font-mono">{feature.name}</span>
                                    {feature.required && (
                                      <span className="text-xs bg-orange-500/20 text-orange-400 px-1 py-0.5 rounded font-mono">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-400 text-xs">{feature.description}</p>
                                </div>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  formData.selectedModules[moduleKey].features[featureKey]
                                    ? 'border-cyan-500 bg-cyan-500'
                                    : 'border-gray-600'
                                }`}>
                                  {formData.selectedModules[moduleKey].features[featureKey] && (
                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Tokenomics */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">TOKENOMICS</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Token Name *</label>
                  <input
                    type="text"
                    value={formData.tokenName}
                    onChange={(e) => handleInputChange('tokenName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="e.g., MyDAO Token"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Token Symbol *</label>
                  <input
                    type="text"
                    value={formData.tokenSymbol}
                    onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="e.g., MYDAO"
                    maxLength={10}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Total Supply *</label>
                  <input
                    type="number"
                    value={formData.totalSupply}
                    onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="1000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Initial Price (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.initialPrice}
                    onChange={(e) => handleInputChange('initialPrice', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="1.00"
                  />
                </div>
              </div>

              {formData.totalSupply && formData.initialPrice && (
                <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2 font-mono">Calculated Values</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-mono">ESTIMATED MARKET CAP</p>
                      <p className="text-green-400 font-bold text-xl">${calculateMarketCap().toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">TOKENS PER DOLLAR</p>
                      <p className="text-cyan-400 font-bold text-xl">
                        {formData.initialPrice ? (1 / parseFloat(formData.initialPrice)).toFixed(2) : '0'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Governance */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">GOVERNANCE PARAMETERS</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Voting Period (Days) *</label>
                  <input
                    type="number"
                    value={formData.votingPeriod}
                    onChange={(e) => handleInputChange('votingPeriod', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="7"
                    min="1"
                    max="30"
                  />
                  <p className="text-gray-400 text-xs mt-1">How long proposals remain open for voting</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Quorum Threshold (%) *</label>
                  <input
                    type="number"
                    value={formData.quorumThreshold}
                    onChange={(e) => handleInputChange('quorumThreshold', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="10"
                    min="1"
                    max="100"
                  />
                  <p className="text-gray-400 text-xs mt-1">Minimum participation required for valid votes</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Proposal Threshold (%) *</label>
                  <input
                    type="number"
                    value={formData.proposalThreshold}
                    onChange={(e) => handleInputChange('proposalThreshold', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="1"
                    min="0.1"
                    max="10"
                    step="0.1"
                  />
                  <p className="text-gray-400 text-xs mt-1">Minimum tokens required to create proposals</p>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2 font-mono">Governance Summary</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="font-mono text-cyan-400">Voting Period:</span> {formData.votingPeriod} days
                  </p>
                  <p className="text-gray-300">
                    <span className="font-mono text-cyan-400">Quorum Required:</span> {formData.quorumThreshold}% of total supply
                  </p>
                  <p className="text-gray-300">
                    <span className="font-mono text-cyan-400">Proposal Threshold:</span> {formData.proposalThreshold}% of total supply
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Funding */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">FUNDING DETAILS</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Funding Goal (USD) *</label>
                  <input
                    type="number"
                    value={formData.fundingGoal}
                    onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="100000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Funding Duration (Days) *</label>
                  <input
                    type="number"
                    value={formData.fundingDuration}
                    onChange={(e) => handleInputChange('fundingDuration', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="30"
                    min="1"
                    max="365"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Minimum Investment (USD)</label>
                  <input
                    type="number"
                    value={formData.minInvestment}
                    onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Maximum Investment (USD)</label>
                  <input
                    type="number"
                    value={formData.maxInvestment}
                    onChange={(e) => handleInputChange('maxInvestment', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Team */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white font-mono">TEAM MEMBERS</h2>
                <button
                  onClick={addTeamMember}
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors font-mono"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white font-mono">Team Member {index + 1}</h3>
                      {formData.teamMembers.length > 1 && (
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Name *</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="Full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Role *</label>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="e.g., Founder, Developer, Advisor"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Bio</label>
                        <textarea
                          value={member.bio}
                          onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="Brief background and experience..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-300 mb-2 font-mono">Wallet Address</label>
                        <input
                          type="text"
                          value={member.wallet}
                          onChange={(e) => updateTeamMember(index, 'wallet', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="0x... or principal ID"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Review */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">REVIEW & LAUNCH</h2>
              
              {/* Comprehensive Review Sections */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    BASIC INFORMATION
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-mono">DAO NAME</p>
                      <p className="text-white font-semibold">{formData.name || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">CATEGORY</p>
                      <p className="text-white font-semibold">{formData.category || 'Not specified'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-400 text-sm font-mono">DESCRIPTION</p>
                      <p className="text-white">{formData.description || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">WEBSITE</p>
                      <p className="text-cyan-400">{formData.website || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Selected Modules & Features */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    SELECTED MODULES & FEATURES
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(formData.selectedModules).map(([key, module]) => {
                      if (!module.selected) return null;
                      const moduleInfo = modules[key];
                      return (
                        <div key={key} className={`bg-gradient-to-r ${moduleInfo.color} bg-opacity-10 border border-gray-600 rounded-lg p-4`}>
                          <div className="flex items-center mb-3">
                            <moduleInfo.icon className="w-5 h-5 text-cyan-400 mr-2" />
                            <span className="font-semibold text-white">{moduleInfo.name}</span>
                            {moduleInfo.required && (
                              <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Required</span>
                            )}
                          </div>
                          <div className="space-y-1">
                            {Object.entries(module.features).map(([featureKey, enabled]) => {
                              if (!enabled) return null;
                              const feature = moduleInfo.features[featureKey];
                              return (
                                <div key={featureKey} className="flex items-center text-sm">
                                  <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                                  <span className="text-gray-300">{feature.name}</span>
                                  {feature.required && (
                                    <span className="ml-1 text-xs text-orange-400">(Required)</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tokenomics */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Coins className="w-5 h-5 mr-2" />
                    TOKENOMICS
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-mono">TOKEN NAME</p>
                      <p className="text-white font-semibold">{formData.tokenName || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">SYMBOL</p>
                      <p className="text-white font-semibold">{formData.tokenSymbol || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">TOTAL SUPPLY</p>
                      <p className="text-white font-semibold">{formData.totalSupply ? Number(formData.totalSupply).toLocaleString() : 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">INITIAL PRICE</p>
                      <p className="text-white font-semibold">{formData.initialPrice ? `$${formData.initialPrice}` : 'Not specified'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-400 text-sm font-mono">ESTIMATED MARKET CAP</p>
                      <p className="text-green-400 font-semibold text-lg">
                        ${calculateMarketCap().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Governance Parameters */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Vote className="w-5 h-5 mr-2" />
                    GOVERNANCE PARAMETERS
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-mono">VOTING PERIOD</p>
                      <p className="text-white font-semibold">{formData.votingPeriod} days</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">QUORUM THRESHOLD</p>
                      <p className="text-white font-semibold">{formData.quorumThreshold}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">PROPOSAL THRESHOLD</p>
                      <p className="text-white font-semibold">{formData.proposalThreshold}%</p>
                    </div>
                  </div>
                </div>

                {/* Funding Details */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    FUNDING DETAILS
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm font-mono">FUNDING GOAL</p>
                      <p className="text-green-400 font-semibold text-lg">
                        ${formData.fundingGoal ? Number(formData.fundingGoal).toLocaleString() : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">DURATION</p>
                      <p className="text-white font-semibold">{formData.fundingDuration} days</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">MIN INVESTMENT</p>
                      <p className="text-white font-semibold">
                        ${formData.minInvestment ? Number(formData.minInvestment).toLocaleString() : 'No minimum'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-mono">MAX INVESTMENT</p>
                      <p className="text-white font-semibold">
                        ${formData.maxInvestment ? Number(formData.maxInvestment).toLocaleString() : 'No maximum'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    TEAM MEMBERS ({formData.teamMembers.length})
                  </h3>
                  <div className="space-y-3">
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-white">{member.name || `Team Member ${index + 1}`}</p>
                            <p className="text-cyan-400 text-sm">{member.role || 'Role not specified'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-xs font-mono">WALLET</p>
                            <p className="text-gray-300 text-xs font-mono">
                              {member.wallet ? `${member.wallet.slice(0, 8)}...${member.wallet.slice(-6)}` : 'Not provided'}
                            </p>
                          </div>
                        </div>
                        {member.bio && (
                          <p className="text-gray-300 text-sm">{member.bio}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal & Compliance */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    LEGAL & COMPLIANCE
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                          className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                        />
                        <span className="text-white font-mono">I agree to the Terms of Service and confirm all information is accurate.</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.kycRequired}
                          onChange={(e) => handleInputChange('kycRequired', e.target.checked)}
                          className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                        />
                        <span className="text-white font-mono">Require KYC verification for investors.</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Launch Summary */}
                <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono flex items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    LAUNCH SUMMARY
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm font-mono">MODULES SELECTED</p>
                      <p className="text-cyan-400 font-bold text-2xl">{getSelectedModulesCount()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-sm font-mono">FEATURES ENABLED</p>
                      <p className="text-purple-400 font-bold text-2xl">{getSelectedFeaturesCount()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-sm font-mono">ESTIMATED LAUNCH</p>
                      <p className="text-green-400 font-bold text-2xl">~5 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-700">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
            >
              Previous
            </button>
            
            <div className="flex space-x-4">
              {currentStep < steps.length ? (
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-lg transition-all font-semibold font-mono"
                >
                  Next
                </button>
              ) : (
                <button
                  disabled={!formData.termsAccepted}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                >
                  🚀 LAUNCH DAO
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preview Modal */}
      {showPreview && <PreviewModal />}
    </div>
  );
};

export default LaunchDAO;