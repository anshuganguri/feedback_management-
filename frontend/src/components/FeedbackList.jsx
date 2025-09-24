import React from 'react';

export default function FeedbackList({ items = [], onStatusChange, onDelete }) {
  if (!items.length) return <div className="text-sm text-gray-500">No feedback yet.</div>;
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <div key={f.id} className="bg-white rounded border p-4 flex items-start justify-between">
          <div className="pr-3">
            <h4 className="font-semibold">{f.title}</h4>
            <p className="text-sm text-gray-600">{f.description}</p>
            <div className="text-xs text-gray-500 mt-1">{f.type} • {f.priority} • {f.rating}/5</div>
          </div>
          <div className="flex items-center gap-2">
            <select value={f.status} onChange={(e) => onStatusChange?.(f.id, e.target.value)} className="border rounded px-2 py-1 text-sm">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <button onClick={() => onDelete?.(f.id)} className="text-red-600 text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}


