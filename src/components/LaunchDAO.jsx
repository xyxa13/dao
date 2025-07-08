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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    daoName: '',
    symbol: '',
    totalSupply: '',
    category: '',
    fundingGoal: '',
    website: '',
    description: ''
  });

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-24 sm:pt-28">
        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">DAO NAME</label>
              <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.daoName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">SYMBOL</label>
              <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.symbol}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">TOTAL SUPPLY</label>
              <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.totalSupply?.toLocaleString()}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">CATEGORY</label>
              <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.category}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">FUNDING GOAL</label>
              <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">${formData.fundingGoal?.toLocaleString()}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">WEBSITE</label>
              <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.website || 'Not provided'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">DESCRIPTION</label>
          <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 leading-relaxed">{formData.description}</p>
        </div>
        
        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm mt-8">
          <h3 className="text-xl font-bold text-white mb-6 font-mono">SELECTED MODULES & FEATURES</h3>
          <div className="space-y-6">
            <p className="text-gray-400">Module configuration will be displayed here</p>
          </div>
        </div>
        
        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm mt-8">
          <h3 className="text-xl font-bold text-white mb-6 font-mono">TEAM MEMBERS</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <p className="text-gray-400">Team member information will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDAO;