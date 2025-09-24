

import React from "react";

export default function DashboardStats({ stats }) {
  const statCards = [
    { label: "Total Feedback", value: stats.total, color: "bg-blue-100 text-blue-800" },
    { label: "Avg Rating", value: stats.avgRating, color: "bg-yellow-100 text-yellow-800" },
    { label: "Pending", value: stats.pending, color: "bg-red-100 text-red-800" },
    { label: "Resolved", value: stats.resolved, color: "bg-green-100 text-green-800" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statCards.map(card => (
        <div key={card.label} className={`rounded shadow p-4 text-center font-bold text-lg ${card.color}`}>
          <div className="text-sm font-medium mb-2">{card.label}</div>
          <div className="text-2xl">{card.value}</div>
        </div>
      ))}
    </div>
  );
}

