import React from 'react';
import DashboardStats from '../components/DashboardStats.jsx';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DashboardStats />
    </div>
  );
}


