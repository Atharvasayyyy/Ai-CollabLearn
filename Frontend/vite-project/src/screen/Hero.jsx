import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';

export const Hero = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [collaboratorIds, setCollaboratorIds] = useState([]);
  const [newCollaboratorId, setNewCollaboratorId] = useState('');
  const [isAddingCollaborators, setIsAddingCollaborators] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
      try {
        setUserData(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    setShowProfileMenu(false);
    navigate('/');
  };

  const handleAddProject = async () => {
    if (projectName.trim()) {
      try {
        const response = await axios.post('/projects/create', {
          name: projectName.trim()
        });
        
        console.log('Project Created Successfully:', response.data);
        setProjectName('');
        setShowModal(false);
      } catch (error) {
        console.error('Error creating project:', error.response?.data || error.message);
      }
    }
  };

  const handleViewMyProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const response = await axios.get('/projects/all');
      console.log('My Projects:', response.data);
      setProjects(response.data.projects || []);
      setShowProjectsModal(true);
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Error fetching projects:', error.response?.data || error.message);
      alert('Failed to load projects');
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleAddCollaborator = () => {
    if (newCollaboratorId.trim()) {
      setCollaboratorIds([...collaboratorIds, newCollaboratorId.trim()]);
      setNewCollaboratorId('');
    }
  };

  const handleRemoveCollaborator = (id) => {
    setCollaboratorIds(collaboratorIds.filter((uid) => uid !== id));
  };

  const handleSubmitCollaborators = async () => {
    if (!selectedProjectId || collaboratorIds.length === 0) {
      alert('Please select a project and add at least one collaborator');
      return;
    }

    setIsAddingCollaborators(true);
    try {
      const response = await axios.put('/projects/add-user', {
        projectId: selectedProjectId,
        users: collaboratorIds
      });
      
      console.log('Collaborators added successfully:', response.data);
      alert('Collaborators added successfully!');
      
      // Reset states
      setCollaboratorIds([]);
      setNewCollaboratorId('');
      setShowAddCollaboratorModal(false);
      setSelectedProjectId(null);
      
      // Refresh projects
      await handleViewMyProjects();
    } catch (error) {
      console.error('Error adding collaborators:', error.response?.data || error.message);
      alert('Failed to add collaborators: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsAddingCollaborators(false);
    }
  };

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
        <div className="flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 rounded-lg border border-purple-600 hover:border-purple-500 text-purple-300 hover:text-purple-100 transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Project
              </button>
              
              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                    {userData?.name ? userData.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold">{userData?.name || 'User'}</p>
                    <p className="text-xs text-gray-400">{userData?.email || ''}</p>
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 transition ${showProfileMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    {/* User Info Section */}
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                          {userData?.name ? userData.name[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-semibold">{userData?.name || 'User'}</p>
                          <p className="text-sm text-gray-400">{userData?.email || ''}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        {userData?.id && <p><span className="text-gray-500">ID:</span> {userData.id}</p>}
                        {userData?.role && <p><span className="text-gray-500">Role:</span> {userData.role}</p>}
                        {userData?.createdAt && <p><span className="text-gray-500">Joined:</span> {new Date(userData.createdAt).toLocaleDateString()}</p>}
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700/50 rounded-lg transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        View Profile
                      </button>
                      <button
                        onClick={handleViewMyProjects}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700/50 rounded-lg transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        My Projects
                      </button>
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700/50 rounded-lg transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </button>
                    </div>

                    {/* Logout Button */}
                    <div className="p-2 border-t border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg font-semibold transition flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
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

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create New Project</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Project Name Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold transition transform hover:scale-105"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Projects Modal */}
      {showProjectsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-4xl shadow-2xl max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-800 pb-4">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isLoadingProjects ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-400">Loading projects...</div>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-gray-400 text-lg">No projects yet</p>
                <p className="text-gray-500 text-sm">Click "Add Project" to create your first project</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id || project.id}
                    className="bg-gray-700/50 border border-gray-600 rounded-lg p-6 hover:border-blue-500/50 transition cursor-pointer hover:bg-gray-700 group"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                          {project.name || project.projectName || 'Untitled Project'}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {project._id || project.id}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Project Description */}
                    {(project.description || project.desc) && (
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                        {project.description || project.desc}
                      </p>
                    )}

                    {/* Project Details */}
                    <div className="space-y-2 text-xs text-gray-400 mb-4">
                      {project.createdAt && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.updatedAt && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.status && (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                          <span className="capitalize">{project.status}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition">
                        Open
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProjectId(project._id || project.id);
                          setCollaboratorIds([]);
                          setNewCollaboratorId('');
                          setShowAddCollaboratorModal(true);
                        }}
                        className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Collaborator
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Add Collaborator Modal */}
      {showAddCollaboratorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Add Collaborators</h2>
                <p className="text-sm text-gray-400 mt-1">Invite team members to work on this project</p>
              </div>
              <button
                onClick={() => {
                  setShowAddCollaboratorModal(false);
                  setCollaboratorIds([]);
                  setNewCollaboratorId('');
                  setSelectedProjectId(null);
                }}
                className="text-gray-400 hover:text-gray-200 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">User ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCollaboratorId}
                    onChange={(e) => setNewCollaboratorId(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCollaborator();
                      }
                    }}
                    placeholder="Paste user ID here"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                  <button
                    onClick={handleAddCollaborator}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Press Enter or click Add to add a user ID</p>
              </div>
            </div>

            {/* Added Collaborators List */}
            {collaboratorIds.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                  Added Collaborators ({collaboratorIds.length})
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {collaboratorIds.map((id, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 hover:border-purple-500/50 transition"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-300 font-mono truncate">{id}</p>
                          <p className="text-xs text-gray-500">User ID</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveCollaborator(id)}
                        className="ml-2 text-red-400 hover:text-red-300 hover:bg-red-600/20 p-2 rounded-lg transition flex-shrink-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-600/10 border border-blue-600/50 rounded-lg p-4 mb-6">
              <p className="text-xs text-blue-200 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Collaborators will be able to view and edit this project. Make sure to use correct user IDs.</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddCollaboratorModal(false);
                  setCollaboratorIds([]);
                  setNewCollaboratorId('');
                  setSelectedProjectId(null);
                }}
                className="flex-1 px-4 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCollaborators}
                disabled={collaboratorIds.length === 0 || isAddingCollaborators}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {isAddingCollaborators ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Collaborators
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
