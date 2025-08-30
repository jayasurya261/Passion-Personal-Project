import React, { useState, useEffect } from "react";
import { HoverEffect } from "../ui/Card-hover-effect";
import { Link } from "react-router";

const Choose = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const projects = [
    {
      title: "Doctor",
      description: "Lets Check how the Cancer Surgery was done",
      link: "https://stripe.com",
      src: "https://chspecialists.org/wp-content/uploads/2023/02/What-Qualifies-as-Major-or-Minor-Surgery.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734714726/Surgery-360_expzog.mp4",
    },
    {
      title: "Engineer",
      description: "Lets Check How Factory mechanical engineer works",
      link: "https://netflix.com",
      src: "https://static.toiimg.com/photo/70512247.cms",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734714840/ToyotoFactory-360_yjk4gv.mp4",
    },
    {
      title: "Chemist",
      description: "Everthing have Bond Lets check how its Exist",
      link: "https://google.com",
      src: "https://www.pharmaceutical.ca/content/uploads/2017/08/CHEMIST-JOB-DESCRIPTION.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734715116/Chemist-360_wnvair.mp4",
    },
    {
      title: "Soldier",
      description: "Who Saves nations And Show Power Among them",
      link: "https://meta.com",
      src: "https://img.freepik.com/premium-photo/man-united-states-army-standing-with-holding-sniper-rifle-black-background_398492-4275.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734715012/Part_1_iuztsj.mp4",
    },
    {
      title: "F1 Racing",
      description: "Experience the thrill of Formula 1 racing",
      link: "https://meta.com",
      src: "https://i2-prod.irishmirror.ie/incoming/article7416563.ece/ALTERNATES/s1227b/F1-Cars-unveiling-and-winter-testing.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734713331/redbull-360_gq4snw.mp4",
    },
  ];

  useEffect(() => {
    // Simulating loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-black">
          {/* Enhanced Spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-t-transparent border-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Header with Navigation */}
          <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-xl border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex justify-between items-center">
                {/* Left - Go Back Button */}
                <Link to="/">
                  <button className="group relative bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Go Back</span>
                    </span>
                  </button>
                </Link>

                {/* Center - Logo/Title */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    VR Experience Hub
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">Immersive Learning Simulations</p>
                </div>

                {/* Right - AI Assistant Button */}
                <Link to="/ai-page">
                  <button className="group relative bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Button content */}
                    <span className="relative flex items-center space-x-3">
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-sm font-bold">Siruvani AI</div>
                        <div className="text-xs opacity-90">Educational Tutor</div>
                      </div>
                    </span>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur group-hover:opacity-30 transition-opacity duration-300"></div>
                  </button>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-black">
            {/* Title Section */}
            <div className="text-center py-16">
              <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-4">
                List of Simulators
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Simulators Grid */}
            <div className="max-w-7xl mx-auto px-8 pb-20">
              <HoverEffect items={projects} />
            </div>

            {/* AI Section with Call-to-Action */}
            <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20 backdrop-blur-sm border-t border-gray-800">
              <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                <div className="mb-8">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Need Learning Support?
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Get instant help with your studies! Our AI tutor specializes in NCERT and Samacheer Kalvi curricula, 
                    offering personalized explanations, step-by-step solutions, and exam preparation guidance for grades 6-12.
                  </p>
                </div>

                {/* Featured AI Button */}
                <Link to="/ai">
                  <button className="group relative bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 overflow-hidden">
                    {/* Animated background waves */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                    
                    {/* Button content */}
                    <span className="relative flex items-center justify-center space-x-4">
                      {/* AI Brain Icon */}
                      <div className="relative">
                        <svg className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                      </div>
                      
                      <div className="text-left">
                        <div className="text-2xl font-bold tracking-wide">Siruvani AI Tutor</div>
                        <div className="text-sm opacity-90 font-medium">NCERT • Samacheer Kalvi • Grades 6-12</div>
                      </div>
                      
                      {/* Arrow */}
                      <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    
                    {/* Glow effects */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </button>
                </Link>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <div className="text-blue-400 text-2xl mb-3">📚</div>
                    <h4 className="text-white font-semibold mb-2">Curriculum Aligned</h4>
                    <p className="text-gray-400 text-sm">Specialized in NCERT and Samacheer Kalvi syllabi</p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <div className="text-purple-400 text-2xl mb-3">🎯</div>
                    <h4 className="text-white font-semibold mb-2">Instant Help</h4>
                    <p className="text-gray-400 text-sm">Get immediate answers to your study questions</p>
                  </div>
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <div className="text-indigo-400 text-2xl mb-3">🏆</div>
                    <h4 className="text-white font-semibold mb-2">Exam Ready</h4>
                    <p className="text-gray-400 text-sm">Comprehensive exam preparation and practice</p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer Navigation */}
          <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex justify-center items-center gap-8">
                <Link to="/">
                  <button className="group bg-white text-black px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Back to Home</span>
                    </span>
                  </button>
                </Link>
                
                <div className="w-px h-12 bg-gray-700"></div>
                
                <Link to="/ai">
                  <button className="group relative bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <span className="relative flex items-center space-x-3">
                      <div className="relative">
                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <span>AI Educational Tutor</span>
                    </span>
                  </button>
                </Link>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-gray-500 text-sm">
                  Choose your simulation or get AI-powered learning assistance
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Choose;