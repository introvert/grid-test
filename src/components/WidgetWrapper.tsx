import React from 'react';
import { X, Edit3 } from 'lucide-react';


interface WidgetWrapperProps {
  children: React.ReactNode;
  title: string;
  id: string;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  children,
  title,
  id,
  onRemove,
  onEdit,
}) => {
  return (
    <div className="widget-wrapper bg-white border border-gray-200 rounded-lg shadow-sm h-full flex flex-col">
      <div className="widget-header flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <div className="flex items-center space-x-1">
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit widget"
            >
              <Edit3 size={14} />
            </button>
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Remove widget"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="widget-content flex-1 p-3 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
