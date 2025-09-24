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




import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Submit Feedback", path: "/submit" },
  { name: "View Feedback", path: "/view" },
  { name: "Dashboard", path: "/dashboard", protected: true },
  { name: "Analytics", path: "/analytics", protected: true },
];

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src={require("../../src/assets/logo.svg")} alt="Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">FeedbackHub</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {navLinks.map(link => {
              if (link.protected && !user) return null;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === link.path ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"}`}
                >
                  {link.name}
                </Link>
              );
            })}
            {!user ? (
              <>
                <Link to="/login" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/login" ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"}`}>Login</Link>
                <Link to="/signup" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/signup" ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"}`}>Signup</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800">Logout</button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1">
          {navLinks.map(link => {
            if (link.protected && !user) return null;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"}`}
              >
                {link.name}
              </Link>
            );
          })}
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/login" ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"}`}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/signup" ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"}`}>Signup</Link>
            </>
          ) : (
            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
}


