Here's the fixed version with all missing closing brackets added:

```jsx
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
  // ... [rest of the component code remains unchanged until the missing section]

  return (
    <div key={module.id}>
      <div
        className={`p-4 rounded-lg border ${
          module.id === 'governance' ? 'bg-cyan-500/10 border-cyan-500/30' :
          module.id === 'treasury' ? 'bg-green-500/10 border-green-500/30' :
          module.id === 'staking' ? 'bg-purple-500/10 border-purple-500/30' :
          module.id === 'analytics' ? 'bg-pink-500/10 border-pink-500/30' :
          'bg-gray-500/10 border-gray-500/30'
        } backdrop-blur-sm ${
          isSelected
            ? 'border-cyan-500 bg-cyan-500/10'
            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
        } ${module.required ? 'opacity-75' : ''}`}
        onClick={() => !module.required && handleModuleToggle(module.id)}
      >
        <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded text-sm font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center`}>
                <ModuleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-2 font-mono">Selected Features:</p>
                <h3 className="text-lg font-semibold text-white">
                  {module.name}
                  {module.required && (
                    <span className="px-2 py-1 bg-gray-800/50 border border-gray-600/30 text-cyan-300 rounded text-sm font-mono">
                      Required
                    </span>
                  )}
                </h3>
                <p className="text-gray-400 text-sm">{module.description}</p>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default LaunchDAO;
```