import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded border p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to FeedbackHub</h1>
        <p className="text-gray-600 mb-6">Collect, manage, and analyze feedback.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/signup" className="px-4 py-2 rounded bg-blue-600 text-white">Get Started</Link>
          <Link to="/login" className="px-4 py-2 rounded border">Login</Link>
        </div>
      </div>
    </div>
  );
}


