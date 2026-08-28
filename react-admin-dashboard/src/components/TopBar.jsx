import React from 'react';
import { Search } from 'lucide-react';

export default function TopBar({ onSearch }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="flex items-center gap-6">
        {/* Search Box */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
          />
        </div>

        {/* User Profile Icon */}
        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-primary-600 transition-colors">
          JT
        </div>
      </div>
    </header>
  );
}
