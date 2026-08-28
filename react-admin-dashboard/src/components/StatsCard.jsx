import React from 'react';

export default function StatsCard({ label, value, change, positive }) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-primary-500 transition-all">
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
      <p className={`text-sm font-semibold flex items-center gap-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{positive ? '↑' : '↓'}</span>
        {change} from last month
      </p>
    </div>
  );
}
