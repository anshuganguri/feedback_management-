import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  FiTrendingUp, 
  FiBarChart, 
  FiPieChart, 
  FiActivity,
  FiStar,
  FiMessageSquare,
  FiClock,
  FiUsers
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { getFeedbackStats, formatDate } from '../utils/helpers';
import { feedbackTypes, feedbackStatuses } from '../data/mockData';
import Layout from '../components/Layout';
import { format, parseISO, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Analytics() {
  const { feedbacks } = useApp();
  const stats = getFeedbackStats(feedbacks);

  // Chart data calculations
  const chartData = useMemo(() => {
    // Feedback by Type (Bar Chart)
    const typeData = {
      labels: feedbackTypes,
      datasets: [{
        label: 'Number of Feedback',
        data: feedbackTypes.map(type => stats.byType[type] || 0),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)', // Red for Bug
          'rgba(59, 130, 246, 0.8)', // Blue for Feature Request
          'rgba(147, 51, 234, 0.8)', // Purple for General
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(147, 51, 234, 1)',
        ],
        borderWidth: 1,
      }],
    };

    // Status Distribution (Pie Chart)
    const statusData = {
      labels: feedbackStatuses,
      datasets: [{
        data: feedbackStatuses.map(status => stats.byStatus[status] || 0),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)', // Red for Open
          'rgba(245, 158, 11, 0.8)', // Yellow for In Progress
          'rgba(34, 197, 94, 0.8)', // Green for Resolved
          'rgba(107, 114, 128, 0.8)', // Gray for Closed
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(107, 114, 128, 1)',
        ],
        borderWidth: 2,
      }],
    };

    // Rating Distribution (Bar Chart)
    const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
      const rating = i + 1;
      return feedbacks.filter(f => f.rating === rating).length;
    });

    const ratingData = {
      labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
      datasets: [{
        label: 'Number of Feedback',
        data: ratingDistribution,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 1,
      }],
    };

    // Timeline Data (Line Chart) - Feedback over time
    const currentYear = new Date().getFullYear();
    const yearStart = startOfYear(new Date(currentYear, 0, 1));
    const yearEnd = endOfYear(new Date(currentYear, 11, 31));
    const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

    const monthlyData = months.map(month => {
      const monthStr = format(month, 'yyyy-MM');
      return feedbacks.filter(feedback => {
        const feedbackMonth = format(parseISO(feedback.date), 'yyyy-MM');
        return feedbackMonth === monthStr;
      }).length;
    });

    const timelineData = {
      labels: months.map(month => format(month, 'MMM yyyy')),
      datasets: [{
        label: 'Feedback Submissions',
        data: monthlyData,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      }],
    };

    return { typeData, statusData, ratingData, timelineData };
  }, [feedbacks, stats]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Calculate additional metrics
  const sentimentAnalysis = useMemo(() => {
    if (feedbacks.length === 0) return { positive: 0, neutral: 0, negative: 0 };
    
    const positive = feedbacks.filter(f => f.rating >= 4).length;
    const neutral = feedbacks.filter(f => f.rating === 3).length;
    const negative = feedbacks.filter(f => f.rating <= 2).length;
    
    return {
      positive: Math.round((positive / feedbacks.length) * 100),
      neutral: Math.round((neutral / feedbacks.length) * 100),
      negative: Math.round((negative / feedbacks.length) * 100),
    };
  }, [feedbacks]);

  const recentTrends = useMemo(() => {
    if (feedbacks.length < 2) return { trend: 'stable', change: 0 };
    
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    const thisWeek = feedbacks.filter(f => new Date(f.date) >= lastWeek).length;
    const previousWeek = feedbacks.filter(f => 
      new Date(f.date) >= twoWeeksAgo && new Date(f.date) < lastWeek
    ).length;
    
    if (previousWeek === 0) return { trend: 'new', change: 100 };
    
    const change = Math.round(((thisWeek - previousWeek) / previousWeek) * 100);
    const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
    
    return { trend, change: Math.abs(change) };
  }, [feedbacks]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insights and trends from your feedback data
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <FiMessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Feedback
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
                <div className="flex items-center text-sm">
                  <FiTrendingUp className={`w-3 h-3 mr-1 ${
                    recentTrends.trend === 'up' ? 'text-green-500' :
                    recentTrends.trend === 'down' ? 'text-red-500' :
                    'text-gray-400'
                  }`} />
                  <span className={`${
                    recentTrends.trend === 'up' ? 'text-green-600' :
                    recentTrends.trend === 'down' ? 'text-red-600' :
                    'text-gray-500'
                  }`}>
                    {recentTrends.change}% this week
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <FiStar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageRating}
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(parseFloat(stats.averageRating))
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <FiActivity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Positive Sentiment
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sentimentAnalysis.positive}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  4+ star ratings
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Resolution Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total > 0 ? Math.round(((stats.byStatus?.['Resolved'] || 0) + (stats.byStatus?.['Closed'] || 0)) / stats.total * 100) : 0}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Resolved + Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feedback by Type */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Feedback by Type
              </h2>
              <FiBarChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64">
              <Bar data={chartData.typeData} options={chartOptions} />
            </div>
          </div>

          {/* Status Distribution */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Status Distribution
              </h2>
              <FiPieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64">
              <Pie data={chartData.statusData} options={pieOptions} />
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Rating Distribution
              </h2>
              <FiStar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64">
              <Bar data={chartData.ratingData} options={chartOptions} />
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Feedback Timeline
              </h2>
              <FiTrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64">
              <Line data={chartData.timelineData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sentiment Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">😊</span>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {sentimentAnalysis.positive}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Positive (4-5 stars)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">😐</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {sentimentAnalysis.neutral}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Neutral (3 stars)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">😞</span>
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {sentimentAnalysis.negative}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Negative (1-2 stars)
              </p>
            </div>
          </div>
        </div>

        {/* No Data State */}
        {feedbacks.length === 0 && (
          <div className="card text-center py-12">
            <FiBarChart className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Analytics Data Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Submit some feedback to see analytics and insights.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}