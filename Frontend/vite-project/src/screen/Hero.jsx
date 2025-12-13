import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-lg border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
            AI
          </div>
          <span className="text-xl font-bold">CollabLearn</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-lg border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Learn & Build With AI
              </h1>
              <p className="text-xl text-gray-400">
                A collaborative platform where students chat, code, and create amazing projects together with AI assistance at every step.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Chat with AI</h3>
                  <p className="text-gray-400">Use @ai in chat to get instant help, explanations, and code suggestions</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H6a6 6 0 100 12H4a2 2 0 01-2-2V5zm15 5a1 1 0 00-1-1H4a1 1 0 000 2h13a1 1 0 001-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Real-Time Collaboration</h3>
                  <p className="text-gray-400">Work together with classmates in real-time on projects and assignments</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Learn By Doing</h3>
                  <p className="text-gray-400">Build real-world projects from scratch with guided AI support</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-semibold transition transform hover:scale-105"
              >
                Get Started Free
              </button>
              <button className="px-8 py-3 border border-gray-600 hover:border-gray-500 rounded-lg font-semibold transition">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-full max-w-md">
              {/* Floating Cards */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              
              <div className="relative space-y-4">
                {/* Message Card 1 */}
                <div className="bg-gray-700/40 backdrop-blur-lg border border-gray-600 rounded-2xl p-4 ml-8 transform -rotate-3 hover:rotate-0 transition">
                  <p className="text-sm text-gray-300">How do I fix this bug in my code?</p>
                  <p className="text-xs text-gray-500 mt-2">You • 2:30 PM</p>
                </div>

                {/* AI Response Card */}
                <div className="bg-blue-600/30 backdrop-blur-lg border border-blue-500/50 rounded-2xl p-4 mr-8 transform rotate-2 hover:rotate-0 transition">
                  <p className="text-sm text-gray-200">I found the issue! The variable scope...</p>
                  <p className="text-xs text-blue-300 mt-2">@AI • 2:31 PM</p>
                </div>

                {/* Collaboration Card */}
                <div className="bg-purple-600/30 backdrop-blur-lg border border-purple-500/50 rounded-2xl p-4 ml-8 transform -rotate-2 hover:rotate-0 transition">
                  <p className="text-sm text-gray-200">Sarah is now editing App.jsx</p>
                  <p className="text-xs text-purple-300 mt-2">Collaboration • 2:35 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose CollabLearn?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition">
            <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Chat Interface</h3>
            <p className="text-gray-400">Just type @ai and get instant responses, code examples, and explanations</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition">
            <div className="w-14 h-14 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-400">Invite classmates and work together seamlessly on group projects</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 hover:border-pink-500/50 transition">
            <div className="w-14 h-14 bg-pink-600/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Build Real Projects</h3>
            <p className="text-gray-400">From idea to deployed application with AI guidance throughout</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-gray-700 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-gray-400 mb-8 text-lg">Join thousands of students learning and creating together</p>
          <button
            onClick={() => navigate('/register')}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-semibold text-lg transition transform hover:scale-105"
          >
            Create Free Account
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2025 CollabLearn. Empowering students to create and learn together.</p>
        </div>
      </footer>
    </div>
  );
};
