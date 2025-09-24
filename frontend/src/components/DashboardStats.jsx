import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function DashboardStats() {
  const data = [
    { name: 'Mon', feedback: 5 },
    { name: 'Tue', feedback: 8 },
    { name: 'Wed', feedback: 6 },
    { name: 'Thu', feedback: 12 },
    { name: 'Fri', feedback: 9 },
    { name: 'Sat', feedback: 4 },
    { name: 'Sun', feedback: 7 },
  ];

  return (
    <div className="bg-white rounded border p-4">
      <h3 className="font-semibold mb-3">Weekly Feedback</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorFeedback" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Area type="monotone" dataKey="feedback" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFeedback)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


