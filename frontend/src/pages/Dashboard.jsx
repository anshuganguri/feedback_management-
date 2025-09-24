

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import FeedbackList from "../components/FeedbackList";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../services/api";

const categories = ["Bug", "Feature", "UI", "Other"];
const statuses = ["Pending", "Resolved"];


export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await api.get("/feedback");
        setFeedbacks(res.data);
      } catch {
        setFeedbacks(JSON.parse(localStorage.getItem("fm_local_feedback") || "[]"));
      }
    }
    fetchFeedbacks();
  }, []);

  // Stats
  const total = feedbacks.length;
  const avgRating = total ? (feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / total).toFixed(2) : 0;
  const pending = feedbacks.filter(f => f.status === "Pending").length;
  const resolved = feedbacks.filter(f => f.status === "Resolved").length;

  // BarChart data
  const categoryCounts = categories.map(cat => ({
    category: cat,
    count: feedbacks.filter(f => f.category === cat).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <section className="mb-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">Feedback Management System Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><span className="font-semibold text-blue-600">Submit Feedback:</span> Users can easily submit feedback with ratings, categories, and comments.</li>
            <li><span className="font-semibold text-blue-600">View & Manage Feedback:</span> Search, filter, and resolve feedback items. Status tags for Pending/Resolved/Bug.</li>
            <li><span className="font-semibold text-blue-600">Dashboard & Analytics:</span> Visualize feedback trends, see stats, and category breakdowns with interactive charts.</li>
            <li><span className="font-semibold text-blue-600">Authentication:</span> Secure login/signup, protected routes, and user management.</li>
            <li><span className="font-semibold text-blue-600">Settings & Profile:</span> Manage user profile, preferences, and theme (dark mode).</li>
            <li><span className="font-semibold text-blue-600">Notifications:</span> Get instant feedback on actions with toast messages.</li>
          </ul>
        </section>
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <DashboardStats stats={{ total, avgRating, pending, resolved }} />
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex gap-2">
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-2 border rounded">
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded">
              <option value="">All Status</option>
              {statuses.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
          <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryCounts} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <FeedbackList filterCategory={filterCategory} filterStatus={filterStatus} />
      </div>
    </div>
  );
}


