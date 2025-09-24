import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiStar, FiSend, FiUser, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import api from '../utils/api';

export default function SubmitFeedback() {
  const { dispatch } = useApp();
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, rating, priority: data.priority };
      const created = await api.createFeedback(payload);
      dispatch({ type: 'ADD_FEEDBACK', payload: created });
      toast.success('Feedback submitted successfully!');
      reset();
      setRating(0);
    } catch (error) {
      toast.error(error.message || 'Failed to submit feedback. Please try again.');
    }
  };

  const StarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="p-1 transition-colors"
          >
            <FiStar
              className={`w-6 h-6 ${
                star <= (hoveredStar || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Submit Feedback</h1>
        <p className="text-gray-600">
          Share your thoughts, suggestions, or report issues to help us improve.
        </p>
      </div>

      {/* Form */}
      <div className="card" style={{ maxWidth: '42rem' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                style={{ paddingLeft: '2.5rem' }}
                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your name"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                style={{ paddingLeft: '2.5rem' }}
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Feedback Type
            </label>
            <select
              id="type"
              className={`input-field ${errors.type ? 'border-red-500' : ''}`}
              {...register('type', { required: 'Please select a feedback type' })}
            >
              <option value="">Select feedback type</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="improvement">Improvement Suggestion</option>
              <option value="question">Question</option>
              <option value="other">Other</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Brief description of your feedback"
              {...register('title', { 
                required: 'Title is required',
                minLength: { value: 5, message: 'Title must be at least 5 characters' }
              })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className={`input-field ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Provide detailed information about your feedback..."
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-4">
              <StarRating />
              <span className="text-sm text-gray-600">
                {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
              </span>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority Level
            </label>
            <select
              id="priority"
              className="input-field"
              {...register('priority')}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="btn-primary"
            >
              <FiSend className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                reset();
                setRating(0);
              }}
              className="btn-secondary"
            >
              Clear Form
            </button>
          </div>

          {/* Help Text */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Tips for better feedback:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be specific about the issue or suggestion</li>
              <li>• Include steps to reproduce bugs</li>
              <li>• Describe the expected vs actual behavior</li>
              <li>• Rate your overall experience honestly</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}