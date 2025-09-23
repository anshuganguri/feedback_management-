import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiMessageSquare, 
  FiEye, 
  FiBarChart, 
  FiSettings,
  FiLogOut,
  FiUser
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function Sidebar({ isOpen, onClose }) {
  const { user, dispatch } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/submit-feedback', icon: FiMessageSquare, label: 'Submit Feedback' },
    { path: '/view-feedback', icon: FiEye, label: 'View Feedback' },
    { path: '/analytics', icon: FiBarChart, label: 'Analytics' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully!');
    navigate('/login');
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="mobile-overlay"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/images/logo.svg" 
                alt="Logo" 
                className="w-6 h-6"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                FeedbackHub
              </h1>
              <p className="text-xs text-gray-500">
                v2.0
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="nav-item w-full text-left text-red-600"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}