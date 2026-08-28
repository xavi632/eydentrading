import React, { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { icon: '📊', label: 'Dashboard', id: 'dashboard' },
    { icon: '👥', label: 'Users', id: 'users' },
    { icon: '📦', label: 'Products', id: 'products' },
    { icon: '📈', label: 'Analytics', id: 'analytics' },
    { icon: '⚙️', label: 'Settings', id: 'settings' },
  ];

  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-slate-900 text-white transition-transform duration-300 z-40`}
      >
        <div className="p-5 border-b border-gray-700 text-center font-bold text-lg">
          <span className="text-primary-500">E</span>T Admin
        </div>

        <nav className="mt-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 transition-all border-l-4 ${
                activeItem === item.id
                  ? 'bg-gray-700 border-l-primary-500 text-white'
                  : 'border-l-transparent text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-5 border-t border-gray-700 pt-5">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            🏠 Back to Main App
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
