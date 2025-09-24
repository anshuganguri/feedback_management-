import React from 'react';
import { FiMenu, FiSun, FiMoon, FiBell, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar({ onMenuClick }) {
  const { theme, dispatch, user, isAuthenticated } = useApp();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <div className="navbar">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <FiMenu className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <img 
              src="/images/logo.svg" 
              alt="Logo" 
              className="w-8 h-8"
            />
            <span className="font-bold text-gray-900">FeedbackHub</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg min-w-0">
            <FiSearch className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm flex-1 min-w-0"
            />
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Notifications"
          >
            <FiBell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <FiMoon className="w-5 h-5 text-gray-600" />
            ) : (
              <FiSun className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Auth Controls */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 ml-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
                <div className="text-xs text-gray-500">{user?.email || 'user@example.com'}</div>
              </div>
              <button
                onClick={() => dispatch({ type: 'LOGOUT' })}
                className="btn-secondary px-4 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login" className="btn-secondary px-4 py-2">Login</Link>
              <Link to="/signup" className="btn-primary px-4 py-2">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}