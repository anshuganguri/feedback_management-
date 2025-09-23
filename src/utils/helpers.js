import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid Date';
  } catch (error) {
    return 'Invalid Date';
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return isValid(date) ? format(date, 'MMM dd, yyyy HH:mm') : 'Invalid Date';
  } catch (error) {
    return 'Invalid Date';
  }
};

export const getStatusColor = (status) => {
  const colors = {
    'Open': 'bg-red-100 text-red-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Closed': 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getTypeColor = (type) => {
  const colors = {
    'Bug': 'bg-red-100 text-red-800',
    'Feature Request': 'bg-blue-100 text-blue-800',
    'General': 'bg-purple-100 text-purple-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export const getRatingStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getAverageRating = (feedbacks) => {
  if (!feedbacks || feedbacks.length === 0) return 0;
  const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
  return (sum / feedbacks.length).toFixed(1);
};

export const getFeedbackStats = (feedbacks) => {
  if (!feedbacks || feedbacks.length === 0) {
    return {
      total: 0,
      byType: {},
      byStatus: {},
      averageRating: 0,
    };
  }

  const byType = feedbacks.reduce((acc, feedback) => {
    acc[feedback.type] = (acc[feedback.type] || 0) + 1;
    return acc;
  }, {});

  const byStatus = feedbacks.reduce((acc, feedback) => {
    acc[feedback.status] = (acc[feedback.status] || 0) + 1;
    return acc;
  }, {});

  return {
    total: feedbacks.length,
    byType,
    byStatus,
    averageRating: getAverageRating(feedbacks),
  };
};