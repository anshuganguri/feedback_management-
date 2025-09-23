import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMessageSquare, 
  FiEye, 
  FiBarChart, 
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiStar,
  FiArrowRight,
  FiPlus
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { mockFeedback } from '../utils/mockData.js';

export default function Dashboard() {
  const { user } = useApp();

  // Calculate statistics
  const stats = useMemo(() => {
    const total = mockFeedback.length;
    const pending = mockFeedback.filter(f => f.status === 'pending').length;
    const resolved = mockFeedback.filter(f => f.status === 'resolved').length;
    const avgRating = mockFeedback.reduce((acc, f) => acc + f.rating, 0) / total;
    
    return {
      total,
      pending,
      resolved,
      avgRating: avgRating.toFixed(1)
    };
  }, []);

  // Recent feedback for display
  const recentFeedback = useMemo(() => 
    mockFeedback.slice(0, 5), []
  );

  const statCards = [
    {
      title: 'Total Feedback',
      value: stats.total,
      icon: FiMessageSquare,
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      icon: FiClock,
      color: 'yellow',
      trend: '+5%'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: FiUsers,
      color: 'green',
      trend: '+8%'
    },
    {
      title: 'Avg Rating',
      value: stats.avgRating,
      icon: FiStar,
      color: 'purple',
      trend: '+0.3'
    }
  ];

  const quickActions = [
    {
      title: 'Submit Feedback',
      description: 'Share your thoughts and suggestions',
      icon: FiPlus,
      to: '/submit-feedback',
      color: 'blue'
    },
    {
      title: 'View All Feedback',
      description: 'Browse and manage feedback entries',
      icon: FiEye,
      to: '/view-feedback',
      color: 'green'
    },
    {
      title: 'Analytics',
      description: 'View detailed insights and trends',
      icon: FiBarChart,
      to: '/analytics',
      color: 'purple'
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'badge badge-yellow',
      'in-progress': 'badge badge-blue',
      resolved: 'badge badge-green',
      closed: 'badge badge-gray'
    };
    return statusClasses[status] || 'badge badge-gray';
  };

  const getTypeBadge = (type) => {
    const typeClasses = {
      bug: 'badge badge-red',
      feature: 'badge badge-purple',
      improvement: 'badge badge-blue',
      question: 'badge badge-gray'
    };
    return typeClasses[type] || 'badge badge-gray';
  };

  return (
    <div className="space-y-8">
      {/* Header with Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <img 
            src="/images/dashboard-hero.svg" 
            alt="Dashboard Hero" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-blue-100 text-lg mb-6">
            Here's what's happening with your feedback today.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-blue-100 text-sm">Total Feedback</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{stats.avgRating}⭐</div>
              <div className="text-blue-100 text-sm">Average Rating</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <div className="text-blue-100 text-sm">Resolved</div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/5 rounded-full animate-bounce"></div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                stat.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                stat.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                stat.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                'bg-gradient-to-br from-purple-500 to-purple-600'
              }`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-700' :
                stat.color === 'green' ? 'bg-green-50 text-green-700' :
                'bg-purple-50 text-purple-700'
              }`}>
                <FiTrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.to}
              className="card hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action.color === 'blue' ? 'bg-blue-100' :
                  action.color === 'green' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  <action.icon className={`w-5 h-5 ${
                    action.color === 'blue' ? 'text-blue-600' :
                    action.color === 'green' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
                <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Feedback */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
          <Link 
            to="/view-feedback"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="card">
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {feedback.user.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{feedback.title}</h4>
                    <span className={getStatusBadge(feedback.status)}>
                      {feedback.status}
                    </span>
                    <span className={getTypeBadge(feedback.type)}>
                      {feedback.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {feedback.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By {feedback.user}</span>
                    <span>•</span>
                    <span>{new Date(feedback.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{feedback.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}