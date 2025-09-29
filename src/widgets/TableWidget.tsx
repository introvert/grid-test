import React from 'react';
import { WidgetWrapper } from '../components/WidgetWrapper';
import type { WidgetProps } from '../types/widget';

interface TableRow {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  value: number;
  date: string;
}

// Mock data generator
const generateTableData = (): TableRow[] => {
  const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson', 'Diana Davis'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];
  const statuses: TableRow['status'][] = ['active', 'inactive', 'pending'];
  
  return Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: names[Math.floor(Math.random() * names.length)],
    email: `user${index + 1}@${domains[Math.floor(Math.random() * domains.length)]}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    value: Math.floor(Math.random() * 10000) + 100,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));
};

interface TableWidgetProps extends WidgetProps {
  showPagination?: boolean;
  rowsPerPage?: number;
}

export const TableWidget: React.FC<TableWidgetProps> = ({
  id,
  title,
  onRemove,
  onEdit,
  showPagination = true,
  rowsPerPage = 8,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const data = React.useMemo(() => generateTableData(), []);
  
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = showPagination ? data.slice(startIndex, endIndex) : data.slice(0, rowsPerPage);

  const getStatusColor = (status: TableRow['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-900">Name</th>
                <th className="px-3 py-2 text-left font-medium text-gray-900">Email</th>
                <th className="px-3 py-2 text-left font-medium text-gray-900">Status</th>
                <th className="px-3 py-2 text-right font-medium text-gray-900">Value</th>
                <th className="px-3 py-2 text-left font-medium text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-900">{row.name}</td>
                  <td className="px-3 py-2 text-gray-600">{row.email}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right text-gray-900">${row.value.toLocaleString()}</td>
                  <td className="px-3 py-2 text-gray-600">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
};
