Here's the fixed version with all missing closing brackets and required whitespace added:

```javascript
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
  // ... [previous code remains unchanged until the syntax errors]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-24 sm:pt-28">
        {/* ... [middle content remains unchanged] */}
        
        <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">DAO NAME</label>
            <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.daoName}</p>
            
            <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">SYMBOL</label>
            <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.symbol}</p>
            
            <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">TOTAL SUPPLY</label>
            <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.totalSupply?.toLocaleString()}</p>
            
            <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">CATEGORY</label>
            <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.category}</p>
            
            <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">FUNDING GOAL</label>
            <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">${formData.fundingGoal?.toLocaleString()}</p>
            
            <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">WEBSITE</label>
            <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 font-mono text-lg">{formData.website || 'Not provided'}</p>
          </div>
        </div>
        
        <label className="block text-sm font-semibold text-cyan-400 mb-2 font-mono">DESCRIPTION</label>
        <p className="text-white bg-gray-900/50 px-4 py-3 rounded-lg border border-gray-600 leading-relaxed">\{formData.description}</p>
        
        <div className="bg-gr\ay-800/50 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6 font-mono">SELECTED MODUL\ES & FEATURES</h3>
          <div className="space\-y-6">
            {/* ... [remaining content] */}
          </div>
        </div>
        
      \  <div className="bg-gray-800/50 \border bord\er-cyan-500/30 r\ounded-xl p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6 font-mono">TEAM M\EMBERS</h3>
          <div cla\ssName="grid md:grid-cols-2 gap-6">
            {/* ... [team members content] */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDAO;
```