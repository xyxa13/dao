import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, TrendingUp, Star, CheckCircle, Gamepad2, Coins, Rocket } from 'lucide-react';

const LandingPage = () => {
  const [mouseTrail, setMouseTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      
      setMouseTrail(prev => {
        const newTrail = [newPoint, ...prev.slice(0, 19)]; // Keep last 20 points
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      description: 'Instant transactions and real-time updates',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Governed by the community, for the community',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'High Growth Potential',
      description: 'Access to vetted, high-potential projects',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$125M+', icon: Coins },
    { label: 'Active Projects', value: '150+', icon: Rocket },
    { label: 'Community Members', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '85%', icon: TrendingUp }
  ];

  const projects = [
    {
      name: 'DeFi Protocol X',
      description: 'Revolutionary lending protocol',
      raised: '$2.5M',
      target: '$5M',
      participants: 1234,
      status: 'Live',
      progress: 50
    },
    {
      name: 'NFT Marketplace Y',
      description: 'Next-gen NFT trading platform',
      raised: '$1.8M',
      target: '$3M',
      participants: 856,
      status: 'Live',
      progress: 60
    },
    {
      name: 'Gaming DAO Z',
      description: 'Community-owned gaming ecosystem',
      raised: '$4.2M',
      target: '$6M',
      participants: 2341,
      status: 'Upcoming',
      progress: 70
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Mouse Trail */}
      {mouseTrail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (20 - index) / 20,
            transform: `scale(${(20 - index) / 20})`,
            transition: 'none'
          }}
        />
      ))}

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {[...Array(400)].map((_, i) => (
              <div key={i} className="border border-cyan-500/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Glitch Effect Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                DAOVERSE
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                animate={{
                  x: [0, 2, -2, 0],
                  opacity: [1, 0.8, 0.9, 1]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                DAOVERSE
              </motion.span>
            </h1>
            
            {/* Pixel Art Style Subtitle */}
            <div className="font-mono text-xl md:text-2xl text-cyan-400 mb-8">
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                >
              </motion.span>
              {" "}THE FUTURE OF DECENTRALIZED FINANCE
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Join the most advanced DAO platform powered by Internet Computer. 
            Invest in vetted projects, participate in governance, and shape the future of finance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link
              to="/dashboard"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <span className="relative z-10 flex items-center">
                <Gamepad2 className="mr-2 w-5 h-5" />
                ENTER DAOVERSE
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <Link
              to="/signin"
              className="group px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105"
            >
              <span className="flex items-center">
                <Shield className="mr-2 w-5 h-5" />
                CONNECT IDENTITY
              </span>
            </Link>
          </motion.div>

          {/* Pixel Art Style Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                POWER-UPS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
              > Experience the next generation of decentralized investment platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group relative bg-gray-900/50 border border-cyan-500/30 rounded-lg p-8 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-mono">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                FEATURED QUESTS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
              > Discover high-potential projects vetted by our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group bg-gray-900/50 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-mono">
                    {project.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    project.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-mono">PROGRESS</span>
                    <span className="font-bold text-cyan-400">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                    <div>
                      <p className="text-gray-500">RAISED</p>
                      <p className="font-bold text-green-400">{project.raised}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">TARGET</p>
                      <p className="font-bold text-white">{project.target}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-gray-500">PLAYERS</span>
                    <span className="font-bold text-purple-400">{project.participants.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono">
              READY TO{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                LEVEL UP?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-mono">
              > Connect your Internet Identity and start your DeFi adventure today.
            </p>
            <Link
              to="/signin"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Rocket className="mr-2 w-5 h-5" />
              START MISSION
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;