import React, { useState } from 'react';

export default function DataTable({ searchTerm }) {
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc',
  });

  const tableData = [
    {
      id: '#ORD-001',
      customer: 'CHEN LU YA MEI',
      amount: '$2,450.00',
      date: 'Aug 15, 2026',
      status: 'Completed',
    },
    {
      id: '#ORD-002',
      customer: 'MARIO MENDOZA',
      amount: '$1,890.50',
      date: 'Aug 14, 2026',
      status: 'Pending',
    },
    {
      id: '#ORD-003',
      customer: 'JULIA DENNIS',
      amount: '$3,120.00',
      date: 'Aug 13, 2026',
      status: 'Completed',
    },
    {
      id: '#ORD-004',
      customer: 'PAUL SMITH',
      amount: '$875.25',
      date: 'Aug 12, 2026',
      status: 'Failed',
    },
    {
      id: '#ORD-005',
      customer: 'ANITA GROOT',
      amount: '$2,645.00',
      date: 'Aug 11, 2026',
      status: 'Completed',
    },
    {
      id: '#ORD-006',
      customer: 'CHEN LU YA MEI',
      amount: '$1,200.75',
      date: 'Aug 10, 2026',
      status: 'Pending',
    },
  ];

  const filteredData = tableData.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
        <button className="px-4 py-2 bg-primary-100 text-primary-500 rounded-lg text-sm font-semibold hover:bg-primary-200 transition-colors">
          📥 Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3 font-semibold text-slate-900">{row.id}</td>
                <td className="px-6 py-3 text-slate-900">{row.customer}</td>
                <td className="px-6 py-3 text-slate-900">{row.amount}</td>
                <td className="px-6 py-3 text-slate-900">{row.date}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => alert(`View ${row.id}`)}
                    className="px-3 py-1 bg-primary-100 text-primary-500 rounded text-xs font-semibold hover:bg-primary-200 transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-500">
          No records found matching your search.
        </div>
      )}
    </div>
  );
}
