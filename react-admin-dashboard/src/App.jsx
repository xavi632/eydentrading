import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import StatsCard from './components/StatsCard';
import DataTable from './components/DataTable';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar onSearch={setSearchTerm} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              label="Total Users"
              value="1,245"
              change="+12%"
              positive={true}
            />
            <StatsCard
              label="Total Revenue"
              value="$145.8k"
              change="+8.5%"
              positive={true}
            />
            <StatsCard
              label="Active Orders"
              value="384"
              change="+5.2%"
              positive={true}
            />
            <StatsCard
              label="Conversion Rate"
              value="3.24%"
              change="-0.8%"
              positive={false}
            />
          </div>

          {/* Data Table */}
          <DataTable searchTerm={searchTerm} />
        </main>
      </div>
    </div>
  );
}

export default App;
