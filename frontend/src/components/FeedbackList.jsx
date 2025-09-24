

import React, { useState, useEffect } from "react";
import api from "../services/api";

const PAGE_SIZE = 5;
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Resolved: "bg-green-100 text-green-800",
  Bug: "bg-red-100 text-red-800",
};

function FeedbackCard({ feedback, onResolve }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`px-2 py-1 rounded text-xs font-semibold mr-2 ${statusColors[feedback.status] || "bg-gray-100 text-gray-800"}`}>{feedback.status}</span>
          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">{feedback.category}</span>
        </div>
        <div className="font-bold text-lg">{feedback.comment}</div>
        <div className="text-sm text-gray-500">By {feedback.name} ({feedback.email})</div>
        <div className="text-sm text-gray-400">Rating: {feedback.rating} ★</div>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm" onClick={() => alert(JSON.stringify(feedback, null, 2))}>View</button>
        {feedback.status === "Pending" && (
          <button className="px-3 py-1 rounded bg-green-600 text-white text-sm" onClick={() => onResolve(feedback.id)}>Resolve</button>
        )}
      </div>
    </div>
  );
}

export default function FeedbackList({ filterCategory, filterStatus }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      try {
        const res = await api.get("/feedback");
        setFeedbacks(res.data);
      } catch {
        // fallback to mock data
        setFeedbacks(JSON.parse(localStorage.getItem("fm_local_feedback") || "[]"));
      } finally {
        setLoading(false);
      }
    }
    fetchFeedbacks();
  }, []);

  const handleResolve = async (id) => {
    try {
      await api.put(`/feedback/${id}`, { status: "Resolved" });
      setFeedbacks(fbs => fbs.map(f => f.id === id ? { ...f, status: "Resolved" } : f));
    } catch {
      setFeedbacks(fbs => fbs.map(f => f.id === id ? { ...f, status: "Resolved" } : f));
    }
  };

  // Filtering
  const filtered = feedbacks.filter(f =>
    (!filterCategory || f.category === filterCategory) &&
    (!filterStatus || f.status === filterStatus)
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {loading ? <div className="text-center py-8">Loading...</div> : null}
      {paginated.map(fb => (
        <FeedbackCard key={fb.id || fb.email + fb.comment} feedback={fb} onResolve={handleResolve} />
      ))}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}


