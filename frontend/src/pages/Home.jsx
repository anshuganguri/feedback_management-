

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 flex flex-col justify-center items-center px-4 py-10">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <img
            src={require("../../src/assets/banner.svg")}
            alt="Banner"
            className="w-80 md:w-[28rem] mb-8 md:mb-0 rounded-3xl shadow-2xl"
          />
        </div>
        <div className="flex-1">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-14 text-center md:text-left border border-blue-100">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4 leading-tight drop-shadow">
              Welcome to <span className="text-blue-500">FeedbackHub</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              The modern platform to collect, manage, and analyze feedback for your product or service. Empower your team with actionable insights and beautiful analytics.
            </p>
            <ul className="mb-10 space-y-3 text-left">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-blue-500 text-2xl animate-bounce">★</span>
                <span className="font-semibold">Submit feedback</span> with ratings and categories
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 text-2xl animate-bounce">✔</span>
                <span className="font-semibold">View, filter, and resolve</span> feedback
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-yellow-500 text-2xl animate-bounce">📊</span>
                <span className="font-semibold">Interactive dashboard</span> & analytics
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-purple-500 text-2xl animate-bounce">🔒</span>
                <span className="font-semibold">Secure authentication</span> & user management
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold shadow-lg hover:bg-blue-50 transition text-lg"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-16 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} FeedbackHub. All rights reserved.
      </footer>
    </div>
  );
}


