import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackgroundParticles from './BackgroundParticles';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Lock, 
  Key, 
  Eye, 
  EyeOff,
  Save,
  ArrowLeft,
  Copy,
  Check,
  Edit3,
  Camera,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  Info,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
  Zap,
  DollarSign,
  TrendingUp,
  Activity,
  Award,
  Star,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const Settings = () => {
  const { isAuthenticated, principal, logout, userSettings, updateUserSettings } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);
  const [showPrincipal, setShowPrincipal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tempDisplayName, setTempDisplayName] = useState(userSettings.displayName);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    setTempDisplayName(userSettings.displayName);
  }, [userSettings.displayName]);

  const copyPrincipal = async () => {
    await navigator.clipboard.writeText(principal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDisplayName = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update global user settings
    const newSettings = { ...userSettings, displayName: tempDisplayName };
    updateUserSettings(newSettings);
    
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleSettingChange = (category, setting, value) => {
    const newSettings = {
      ...userSettings,
      [category]: {
        ...userSettings[category],
        [setting]: value
      }
    };
    updateUserSettings(newSettings);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'advanced', label: 'Advanced', icon: Zap }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* Profile Header */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6 flex items-center">
          <User className="w-5 h-5 mr-2 text-cyan-400" />
          Profile Information
        </h3>
        
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Avatar Section */}
          <div className="relative mx-auto sm:mx-0">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 lg:w-8 lg:h-8 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors">
              <Camera className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            </button>
          </div>

          {/* Profile Details */}
          <div className="flex-1 w-full space-y-4">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Display Name</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempDisplayName}
                    onChange={(e) => setTempDisplayName(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    placeholder="Enter your display name"
                  />
                ) : (
                  <div className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white">
                    {userSettings.displayName}
                  </div>
                )}
                
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveDisplayName}
                      disabled={isSaving}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setTempDisplayName(userSettings.displayName);
                      }}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <span className="hidden sm:inline">Cancel</span>
                      <span className="sm:hidden">✕</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                )}
              </div>
            </div>

            {/* Principal ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Principal ID</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg font-mono text-cyan-400 text-xs lg:text-sm break-all">
                  {showPrincipal ? principal : `${principal?.slice(0, 12)}...${principal?.slice(-8)}`}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPrincipal(!showPrincipal)}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {showPrincipal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={copyPrincipal}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
              <textarea
                value={userSettings.bio}
                onChange={(e) => updateUserSettings({ ...userSettings, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Stats - Responsive Grid */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
          Portfolio Overview
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {[
            { label: 'Total Invested', value: '$12,450', icon: DollarSign, color: 'text-green-400' },
            { label: 'Active Projects', value: '8', icon: Activity, color: 'text-blue-400' },
            { label: 'Total Returns', value: '+24.5%', icon: TrendingUp, color: 'text-green-400' },
            { label: 'DAO Tokens', value: '1,247', icon: Award, color: 'text-purple-400' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3 lg:p-4 border border-gray-700/30">
              <div className="flex items-center space-x-1 lg:space-x-2 mb-1 lg:mb-2">
                <stat.icon className={`w-3 h-3 lg:w-4 lg:h-4 ${stat.color}`} />
                <span className="text-xs text-gray-400 font-mono">{stat.label.toUpperCase()}</span>
              </div>
              <p className={`text-sm lg:text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Two-Factor Authentication */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-4">
          <div>
            <h3 className="text-base lg:text-lg font-bold text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-cyan-400" />
              Two-Factor Authentication
            </h3>
            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => handleSettingChange('security', 'twoFactor', !userSettings.security.twoFactor)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              userSettings.security.twoFactor ? 'bg-cyan-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                userSettings.security.twoFactor ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {userSettings.security.twoFactor && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm flex items-center">
              <Check className="w-4 h-4 mr-2" />
              Two-factor authentication is enabled
            </p>
          </div>
        )}
      </div>

      {/* Session Management */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-cyan-400" />
          Session Management
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Session Timeout (minutes)</label>
            <select
              value={userSettings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={0}>Never</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <h4 className="text-white font-medium">Login Alerts</h4>
              <p className="text-gray-400 text-sm">Get notified of new login attempts</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'loginAlerts', !userSettings.security.loginAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                userSettings.security.loginAlerts ? 'bg-cyan-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  userSettings.security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-red-400 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Danger Zone
        </h3>
        
        <div className="space-y-3 lg:space-y-4">
          <button className="w-full px-4 py-3 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center space-x-2">
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
          
          <button 
            onClick={logout}
            className="w-full px-4 py-3 bg-orange-600/20 border border-orange-500/30 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sign Out All Devices</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Email Notifications */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-cyan-400" />
          Email Notifications
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'marketing', label: 'Marketing Emails', desc: 'Receive updates about new features and promotions' }
          ].map((item) => (
            <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', item.key, !userSettings.notifications[item.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  userSettings.notifications[item.key] ? 'bg-cyan-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userSettings.notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 flex items-center">
          <Smartphone className="w-5 h-5 mr-2 text-cyan-400" />
          Push Notifications
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
            { key: 'sms', label: 'SMS Notifications', desc: 'Receive important alerts via SMS' }
          ].map((item) => (
            <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', item.key, !userSettings.notifications[item.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  userSettings.notifications[item.key] ? 'bg-cyan-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userSettings.notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Appearance */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 flex items-center">
          <Palette className="w-5 h-5 mr-2 text-cyan-400" />
          Appearance
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Theme</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'dark', label: 'Dark', icon: Moon },
                { value: 'light', label: 'Light', icon: Sun }
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleSettingChange('preferences', 'theme', theme.value)}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                    userSettings.preferences.theme === theme.value
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <theme.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-medium">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <h4 className="text-white font-medium">Sound Effects</h4>
              <p className="text-gray-400 text-sm">Play sounds for interactions</p>
            </div>
            <button
              onClick={() => handleSettingChange('preferences', 'soundEffects', !userSettings.preferences.soundEffects)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                userSettings.preferences.soundEffects ? 'bg-cyan-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  userSettings.preferences.soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <h4 className="text-white font-medium">Animations</h4>
              <p className="text-gray-400 text-sm">Enable smooth animations</p>
            </div>
            <button
              onClick={() => handleSettingChange('preferences', 'animations', !userSettings.preferences.animations)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                userSettings.preferences.animations ? 'bg-cyan-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  userSettings.preferences.animations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-cyan-400" />
          Localization
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Language</label>
            <select
              value={userSettings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Currency</label>
            <select
              value={userSettings.preferences.currency}
              onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="ICP">ICP</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-cyan-400" />
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'showProfile', label: 'Public Profile', desc: 'Allow others to view your profile' },
            { key: 'showActivity', label: 'Activity Visibility', desc: 'Show your recent activity to others' },
            { key: 'showInvestments', label: 'Investment History', desc: 'Display your investment history publicly' }
          ].map((item) => (
            <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('privacy', item.key, !userSettings.privacy[item.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  userSettings.privacy[item.key] ? 'bg-cyan-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userSettings.privacy[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-4 lg:space-y-6">
      {/* Data Management */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 flex items-center">
          <Download className="w-5 h-5 mr-2 text-cyan-400" />
          Data Management
        </h3>
        
        <div className="space-y-3 lg:space-y-4">
          <button className="w-full px-4 py-3 bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export My Data</span>
          </button>
          
          <button className="w-full px-4 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center justify-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import Data</span>
          </button>
        </div>
      </div>

      {/* Developer Options */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-cyan-400" />
          Developer Options
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="text-white font-medium mb-2">API Access</h4>
            <p className="text-gray-400 text-sm mb-3">Generate API keys for third-party integrations</p>
            <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Generate API Key</span>
            </button>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="text-white font-medium mb-2">Webhook URLs</h4>
            <p className="text-gray-400 text-sm mb-3">Configure webhooks for real-time notifications</p>
            <button className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Configure Webhooks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'security': return renderSecurityTab();
      case 'notifications': return renderNotificationsTab();
      case 'preferences': return renderPreferencesTab();
      case 'privacy': return renderPrivacyTab();
      case 'advanced': return renderAdvancedTab();
      default: return renderProfileTab();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Particles */}
      <BackgroundParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10 pt-24 sm:pt-28">
        {/* Header - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8"
        >
          <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2 font-mono">
                SETTINGS CONTROL PANEL
              </h1>
              <p className="text-cyan-400 font-mono text-sm lg:text-base">
                > Configure your DAOVerse experience
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Navigation - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm lg:sticky lg:top-8">
              <nav className="space-y-1 lg:space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all text-left ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-medium text-sm lg:text-base">{tab.label}</span>
                    {activeTab === tab.id && (
                      <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 ml-auto" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;