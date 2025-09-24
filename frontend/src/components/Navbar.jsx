import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">FeedbackHub</Link>
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.name || 'User'}</span>
            <button onClick={logout} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-3 py-1.5 rounded border text-sm">Login</Link>
            <Link to="/signup" className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
}


