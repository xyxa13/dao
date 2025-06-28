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
  Star
} from 'lucide-react';

const LaunchDAO = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    logo: null
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: Globe },
    { id: 2, title: 'Tokenomics', icon: Coins },
    { id: 3, title: 'Funding', icon: Target },
    { id: 4, title: 'Review', icon: CheckCircle }
  ];

  const categories = [
    'DeFi', 'NFT', 'Gaming', 'Infrastructure', 'Social', 'Metaverse', 'AI/ML', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle DAO creation logic here
    console.log('Creating DAO with data:', formData);
    setIsModalOpen(false);
    // Show success message or redirect
  };

  const openModal = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
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
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-4"
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  LAUNCH
                </span>
              </h1>
            </div>
            
            <div className="font-mono text-2xl md:text-3xl text-cyan-400 mb-8">
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                >
              </motion.span>
              {" "}YOUR OWN DAO
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Create, fund, and govern your decentralized autonomous organization with the power of Internet Computer
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { icon: Shield, title: 'Secure & Transparent', desc: 'Built on Internet Computer blockchain' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Instant transactions and governance' },
              { icon: TrendingUp, title: 'Growth Focused', desc: 'Tools for sustainable growth' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Launch Button */}
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold text-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center">
              <Sparkles className="mr-3 w-6 h-6" />
              LAUNCH YOUR DAO
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </motion.button>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 font-mono">CREATE YOUR DAO</h2>
                <p className="text-cyan-400 font-mono">Step {currentStep} of 4</p>
              </div>

              {/* Progress Bar */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        currentStep >= step.id 
                          ? 'bg-cyan-500 border-cyan-500 text-white' 
                          : 'border-gray-600 text-gray-400'
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-1 mx-2 transition-all ${
                          currentStep > step.id ? 'bg-cyan-500' : 'bg-gray-600'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">DAO Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                        placeholder="Enter your DAO name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                        placeholder="Describe your DAO's mission and goals"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Website (Optional)</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                        placeholder="https://your-dao-website.com"
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Token Symbol</label>
                        <input
                          type="text"
                          value={formData.tokenSymbol}
                          onChange={(e) => handleInputChange('tokenSymbol', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="e.g., MYDAO"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Total Supply</label>
                        <input
                          type="number"
                          value={formData.tokenSupply}
                          onChange={(e) => handleInputChange('tokenSupply', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="1000000"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-mono">Token Distribution</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-mono">Public Sale</span>
                          <span className="text-cyan-400 font-mono">40%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-mono">Team & Advisors</span>
                          <span className="text-cyan-400 font-mono">20%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-mono">Treasury</span>
                          <span className="text-cyan-400 font-mono">25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-mono">Ecosystem</span>
                          <span className="text-cyan-400 font-mono">15%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Funding Goal (ICP)</label>
                        <input
                          type="number"
                          value={formData.fundingGoal}
                          onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="1000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Campaign Duration (Days)</label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                          placeholder="30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-mono">Minimum Investment (ICP)</label>
                      <input
                        type="number"
                        value={formData.minInvestment}
                        onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white font-mono"
                        placeholder="1"
                      />
                    </div>

                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-mono">Funding Milestones</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-mono">25% - MVP Development</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-mono">50% - Beta Launch</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-mono">75% - Marketing & Growth</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-mono">100% - Full Launch</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-mono">Review Your DAO</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Name:</span>
                          <span className="text-cyan-400 font-mono">{formData.name || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Category:</span>
                          <span className="text-cyan-400 font-mono">{formData.category || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Token Symbol:</span>
                          <span className="text-cyan-400 font-mono">{formData.tokenSymbol || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Funding Goal:</span>
                          <span className="text-cyan-400 font-mono">{formData.fundingGoal || 'Not set'} ICP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 font-mono">Duration:</span>
                          <span className="text-cyan-400 font-mono">{formData.duration || 'Not set'} days</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                      <p className="text-yellow-400 text-sm font-mono">
                        ⚠️ Once created, some DAO parameters cannot be changed. Please review carefully.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                >
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all font-mono"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-mono flex items-center"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Launch DAO
                  </button>
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