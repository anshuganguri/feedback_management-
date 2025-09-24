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



import React, { useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import api from "../services/api";

function showToast(msg, type = "success") {
  // Simple toast implementation
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded shadow text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

export default function SubmitFeedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data, reset) => {
    setIsSubmitting(true);
    try {
      await api.post("/feedback", data);
      showToast("Feedback submitted successfully!", "success");
      reset();
    } catch (err) {
      // Fallback: save to localStorage
      const localKey = "fm_local_feedback";
      const existing = JSON.parse(localStorage.getItem(localKey) || "[]");
      localStorage.setItem(localKey, JSON.stringify([...existing, data]));
      showToast("Offline: Feedback saved locally.", "error");
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit Feedback</h2>
      <FeedbackForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}


