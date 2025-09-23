import React, { useState, useMemo } from 'react';
import { FiSearch, FiFilter, FiEye, FiEdit3, FiTrash2, FiStar } from 'react-icons/fi';
import { mockFeedback } from '../utils/mockData.js';
import toast from 'react-hot-toast';

export default function ViewFeedback() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and sort feedback
  const filteredFeedback = useMemo(() => {
    let filtered = mockFeedback.filter(feedback => {
      const matchesSearch = feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           feedback.user.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
      const matchesType = typeFilter === 'all' || feedback.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, typeFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedback = filteredFeedback.slice(startIndex, startIndex + itemsPerPage);

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

  const handleStatusUpdate = (id, newStatus) => {
    toast.success(`Feedback status updated to ${newStatus}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
        <p className="text-gray-600">
          View, search, and manage all feedback submissions.
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search feedback..."
              style={{ paddingLeft: '2.5rem' }}
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="input-field"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Type Filter */}
          <select
            className="input-field"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
            <option value="question">Question</option>
          </select>

          {/* Sort */}
          <select
            className="input-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-gray-900">{filteredFeedback.length}</p>
          <p className="text-sm text-gray-600">Total Results</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {filteredFeedback.filter(f => f.status === 'pending').length}
          </p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-blue-600">
            {filteredFeedback.filter(f => f.status === 'in-progress').length}
          </p>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-green-600">
            {filteredFeedback.filter(f => f.status === 'resolved').length}
          </p>
          <p className="text-sm text-gray-600">Resolved</p>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {paginatedFeedback.map((feedback) => (
          <div key={feedback.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{feedback.title}</h3>
                  <span className={getStatusBadge(feedback.status)}>
                    {feedback.status}
                  </span>
                  <span className={getTypeBadge(feedback.type)}>
                    {feedback.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{feedback.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span>By {feedback.user}</span>
                  <span>{new Date(feedback.date).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(feedback.rating)}
                    <span className="ml-1">{feedback.rating}/5</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={feedback.status}
                  onChange={(e) => handleStatusUpdate(feedback.id, e.target.value)}
                  className="input-field text-sm"
                  style={{ minWidth: '120px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <FiEye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                  <FiEdit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="btn-secondary px-3 py-2"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="btn-secondary px-3 py-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}