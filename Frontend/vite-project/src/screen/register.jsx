import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { useUser } from '../context/user.context';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/users/create', {
        email,
        password,
      });

      if (response.status === 201) {
        // Use context to store user and token
        registerUser(response.data.user, response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-800 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Footer Links */}
          <div className="space-y-3 text-center text-sm">
            <p className="text-gray-400">
              Already have the Account?{' '}
              <a onClick={() => navigate('/login')} className="text-blue-400 hover:text-blue-300 font-semibold transition cursor-pointer">
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-center text-gray-600 text-xs">
          <p>Secure Register protected by encryption</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;