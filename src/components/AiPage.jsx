import React, { useState, useEffect } from 'react';
import { Bot, Brain, BookOpen, Target, Crown, Video, ArrowRight, Sparkles, Zap, Users, Volume2, FileBarChart } from 'lucide-react';

const AIHeroPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => window.history.back()} 
              className="group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-white/20"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Siruvani AI Platform
              </h1>
            </div>
            
            <div className="flex items-center space-x-3 flex-wrap">
              <button 
                onClick={() => window.open('/speak', '_self')} 
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-green-400/30 hover:border-green-300/50"
              >
                <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Speak</span>
              </button>

              <button 
                onClick={() => window.open('/insight', '_self')} 
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-indigo-400/30 hover:border-indigo-300/50"
              >
                <Brain className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Insights</span>
              </button>

              <button 
                onClick={() => window.open('/diagram', '_self')} 
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-orange-400/30 hover:border-orange-300/50"
              >
                <FileBarChart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Diagram</span>
              </button>

              <button 
                onClick={() => window.open('/ai', '_self')} 
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-blue-400/30 hover:border-blue-300/50"
              >
                <Bot className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>AI Tutor</span>
              </button>

              <button 
                onClick={() => window.open('/game', '_self')} 
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-emerald-400/30 hover:border-emerald-300/50"
              >
                <Target className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Quiz</span>
              </button>

              <button 
                onClick={() => window.open('/video', '_self')} 
                className="group flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30"
              >
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Simulators</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Main Hero Content */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* AI Icon with Animation */}
            <div className="relative inline-block mb-8">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl transform hover:scale-110 transition-transform duration-500">
                <Brain className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur opacity-50 animate-pulse"></div>
            </div>

            {/* Main Title */}
            <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Siruvani AI
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-300 mb-8">
              Your Educational Tutor
            </h2>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Experience next-generation learning with our AI tutor specialized in NCERT and Samacheer Kalvi curricula. 
              Get instant, accurate, and personalized educational support for grades 6-12.
            </p>

            {/* Main CTA Button */}
            <button 
              onClick={() => window.open('/ai', '_self')}
              className="group relative bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 mb-16"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="relative flex items-center space-x-3">
                <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Start Learning with AI</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Features Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <BookOpen className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Curriculum Mastery</h3>
              <p className="text-gray-300">Complete coverage of NCERT and Samacheer Kalvi syllabi with chapter-wise explanations and concept clarity.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <Target className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Personalized Learning</h3>
              <p className="text-gray-300">Adaptive responses based on your grade level, learning pace, and specific educational needs.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <Zap className="w-12 h-12 text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Instant Solutions</h3>
              <p className="text-gray-300">Get step-by-step solutions, doubt clarification, and exam preparation tips available 24/7.</p>
            </div>
          </div>

          {/* Premium 360 Simulation Section */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-yellow-900/20 backdrop-blur-sm rounded-3xl p-12 border border-amber-500/30 overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-6 right-6">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                  <Crown className="w-4 h-4" />
                  <span>PREMIUM</span>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-bounce"></div>
              <div className="absolute bottom-10 right-16 w-16 h-16 bg-orange-400/20 rounded-full blur-xl animate-bounce delay-1000"></div>

              <div className="relative z-10 text-center">
                <div className="inline-block mb-6">
                  <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-2xl">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                </div>

                <h2 className="text-5xl font-bold text-white mb-4">
                  360° VR Simulations
                </h2>
                
                <p className="text-xl text-amber-200 mb-8 max-w-3xl mx-auto">
                  Immerse yourself in revolutionary 360-degree virtual reality experiences! 
                  Explore surgery procedures, engineering marvels, chemical reactions, and military operations 
                  like never before with our premium simulation addon.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                  <div className="flex items-center space-x-3 text-amber-100">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Immersive VR Surgery Simulations</span>
                  </div>
                  <div className="flex items-center space-x-3 text-amber-100">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Engineering Workshop Experiences</span>
                  </div>
                  <div className="flex items-center space-x-3 text-amber-100">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Chemistry Lab 360° Experiments</span>
                  </div>
                  <div className="flex items-center space-x-3 text-amber-100">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Military Training Scenarios</span>
                  </div>
                </div>

                {/* Premium CTA Button */}
                <button 
                  onClick={() => window.open('/video', '_self')}
                  className="group relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-16 py-6 rounded-2xl font-bold text-2xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all duration-500 shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105 overflow-hidden"
                >
                  {/* Shimmer animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  <span className="relative flex items-center space-x-4">
                    <Crown className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="text-left">
                      <div>Experience 360° Simulations</div>
                      <div className="text-sm opacity-90 font-medium">Premium Addon Available</div>
                    </div>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>

                <p className="text-amber-300/80 text-sm mt-4">
                  🎯 Unlock immersive learning experiences with our premium 360° VR simulations
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className={`text-center pt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Learning?</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive AI-powered educational platform and unlock your full learning potential with personalized tutoring, interactive simulations, and immersive experiences.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIHeroPage;