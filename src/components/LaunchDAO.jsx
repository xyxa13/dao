import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';
import { 
  ArrowLeft, 
  ArrowRight, 
  Rocket, 
  Shield, 
  Users, 
  DollarSign, 
  Settings, 
  Eye,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  Zap,
  Target,
  TrendingUp,
  Globe,
  Lock,
  Sparkles,
  Plus,
  Minus,
  X,
  FileText,
  Coins,
  Vote,
  Wallet,
  BarChart3,
  Award,
  Clock,
  Loader2,
  LayoutDashboard
} from 'lucide-react';

const LaunchDAO = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [daoConfig, setDaoConfig] = useState({
    name: '',
    description: '',
    tokenName: '',
    tokenSymbol: '',
    initialSupply: '',
    modules: ['governance', 'treasury'],
    governanceSettings: {
      votingPeriod: 7,
      quorum: 50,
      proposalThreshold: 1
    },
    treasurySettings: {
      initialFunding: '',
      spendingLimit: ''
    }
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState('');

  const steps = [
    { id: 1, title: 'Basic Info', icon: FileText },
    { id: 2, title: 'Token Setup', icon: Coins },
    { id: 3, title: 'Modules', icon: Settings },
    { id: 4, title: 'Governance', icon: Vote },
    { id: 5, title: 'Treasury', icon: Wallet },
    { id: 6, title: 'Review & Deploy', icon: Rocket }
  ];

  const availableModules = [
    {
      id: 'governance',
      name: 'Governance',
      description: 'Voting and proposal system',
      icon: Vote,
      color: 'from-cyan-500 to-blue-600',
      required: true
    },
    {
      id: 'treasury',
      name: 'Treasury',
      description: 'Fund management and allocation',
      icon: Wallet,
      color: 'from-green-500 to-emerald-600',
      required: true
    },
    {
      id: 'staking',
      name: 'Staking',
      description: 'Token staking rewards',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-600',
      required: false
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'DAO performance metrics',
      icon: BarChart3,
      color: 'from-pink-500 to-rose-600',
      required: false
    }
  ];

  const handleInputChange = (field, value) => {
    setDaoConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setDaoConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleModuleToggle = (moduleId) => {
    const module = availableModules.find(m => m.id === moduleId);
    if (module?.required) return;

    setDaoConfig(prev => ({
      ...prev,
      modules: prev.modules.includes(moduleId)
        ? prev.modules.filter(id => id !== moduleId)
        : [...prev.modules, moduleId]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus('Initializing deployment...');
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeploymentStatus('Creating smart contracts...');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      setDeploymentStatus('Deploying to Internet Computer...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeploymentStatus('Finalizing setup...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard after successful deployment
      navigate('/dashboard');
    } catch (error) {
      console.error('Deployment failed:', error);
      setDeploymentStatus('Deployment failed. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                DAO Name
              </label>
              <input
                type="text"
                value={daoConfig.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                placeholder="Enter your DAO name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={daoConfig.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                placeholder="Describe your DAO's purpose and goals"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token Name
                </label>
                <input
                  type="text"
                  value={daoConfig.tokenName}
                  onChange={(e) => handleInputChange('tokenName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., MyDAO Token"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Token Symbol
                </label>
                <input
                  type="text"
                  value={daoConfig.tokenSymbol}
                  onChange={(e) => handleInputChange('tokenSymbol', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., MDT"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Initial Supply
              </label>
              <input
                type="number"
                value={daoConfig.initialSupply}
                onChange={(e) => handleInputChange('initialSupply', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                placeholder="1000000"
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select DAO Modules</h3>
              <p className="text-gray-400 text-sm mb-6">
                Choose the features your DAO will have. Some modules are required for basic functionality.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableModules.map((module) => {
                const ModuleIcon = module.icon;
                const isSelected = daoConfig.modules.includes(module.id);
                
                return (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    } ${module.required ? 'opacity-75' : ''}`}
                    onClick={() => !module.required && handleModuleToggle(module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center`}>
                          <ModuleIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {module.name}
                            {module.required && (
                              <span className="ml-2 px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                                Required
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-400 text-sm">{module.description}</p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle className="w-6 h-6 text-cyan-500" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Governance Settings</h3>
              <p className="text-gray-400 text-sm mb-6">
                Configure how voting and proposals work in your DAO.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Voting Period (days)
                </label>
                <input
                  type="number"
                  value={daoConfig.governanceSettings.votingPeriod}
                  onChange={(e) => handleNestedInputChange('governanceSettings', 'votingPeriod', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  min="1"
                  max="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quorum (%)
                </label>
                <input
                  type="number"
                  value={daoConfig.governanceSettings.quorum}
                  onChange={(e) => handleNestedInputChange('governanceSettings', 'quorum', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Proposal Threshold (%)
                </label>
                <input
                  type="number"
                  value={daoConfig.governanceSettings.proposalThreshold}
                  onChange={(e) => handleNestedInputChange('governanceSettings', 'proposalThreshold', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  min="0.1"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Treasury Settings</h3>
              <p className="text-gray-400 text-sm mb-6">
                Configure your DAO's treasury and spending limits.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Initial Funding (ICP)
                </label>
                <input
                  type="number"
                  value={daoConfig.treasurySettings.initialFunding}
                  onChange={(e) => handleNestedInputChange('treasurySettings', 'initialFunding', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  placeholder="100"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Daily Spending Limit (ICP)
                </label>
                <input
                  type="number"
                  value={daoConfig.treasurySettings.spendingLimit}
                  onChange={(e) => handleNestedInputChange('treasurySettings', 'spendingLimit', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  placeholder="10"
                  step="0.01"
                />
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Review & Deploy</h3>
              <p className="text-gray-400 text-sm mb-6">
                Review your DAO configuration before deployment.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Name:</span> <span className="text-white">{daoConfig.name}</span></p>
                    <p><span className="text-gray-400">Token:</span> <span className="text-white">{daoConfig.tokenName} ({daoConfig.tokenSymbol})</span></p>
                    <p><span className="text-gray-400">Supply:</span> <span className="text-white">{daoConfig.initialSupply}</span></p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {daoConfig.modules.map(moduleId => {
                      const module = availableModules.find(m => m.id === moduleId);
                      return (
                        <span key={moduleId} className={`px-3 py-2 bg-gradient-to-r ${module?.color} text-white rounded-lg text-sm font-medium shadow-lg`}>
                          {module?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Governance</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-400">Voting Period:</span> <span className="text-white">{daoConfig.governanceSettings.votingPeriod} days</span></p>
                    <p><span className="text-gray-400">Quorum:</span> <span className="text-white">{daoConfig.governanceSettings.quorum}%</span></p>
                    <p><span className="text-gray-400">Proposal Threshold:</span> <span className="text-white">{daoConfig.governanceSettings.proposalThreshold}%</span></p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Treasury</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-400">Initial Funding:</span> <span className="text-white">{daoConfig.treasurySettings.initialFunding} ICP</span></p>
                    <p><span className="text-gray-400">Daily Limit:</span> <span className="text-white">{daoConfig.treasurySettings.spendingLimit} ICP</span></p>
                  </div>
                </div>
              </div>
            </div>

            {isDeploying && (
              <div className="bg-gray-800/50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Loader2 className="w-6 h-6 text-cyan-500 animate-spin" />
                  <h4 className="text-lg font-semibold text-white">Deploying DAO</h4>
                </div>
                <p className="text-gray-400">{deploymentStatus}</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div className="bg-cyan-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Launch Your DAO</h1>
          </motion.div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create and deploy your decentralized autonomous organization on the Internet Computer
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isCompleted 
                        ? 'bg-cyan-500 border-cyan-500' 
                        : isActive 
                        ? 'border-cyan-500 bg-cyan-500/20' 
                        : 'border-gray-600 bg-gray-800'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-cyan-400' : isCompleted ? 'text-cyan-500' : 'text-gray-400'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-cyan-500' : 'bg-gray-600'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-4xl mx-auto mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleDeploy}
              disabled={isDeploying || !daoConfig.name || !daoConfig.tokenName}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Deploy DAO</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchDAO;