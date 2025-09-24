import React, { useState } from 'react';
import FeedbackForm from '../components/FeedbackForm.jsx';
import api from '../services/api.js';

export default function SubmitFeedback() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      await api.post('/feedback', values);
      alert('Feedback submitted');
    } catch (e) {
      alert('Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
      <FeedbackForm onSubmit={onSubmit} isSubmitting={submitting} />
    </div>
  );
}


