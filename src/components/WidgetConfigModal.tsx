import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { WidgetConfig } from '../types/widget';
import { widgetRegistry } from '../widgets';

interface WidgetConfigModalProps {
  widget: WidgetConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (widget: WidgetConfig) => void;
}

export const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({
  widget,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(widget?.title || '');
  const [props, setProps] = useState(widget?.props || {});

  React.useEffect(() => {
    if (widget) {
      setTitle(widget.title);
      setProps(widget.props || {});
    }
  }, [widget]);

  if (!isOpen || !widget) return null;

  const widgetDef = widgetRegistry.get(widget.type);
  if (!widgetDef) return null;

  const handleSave = () => {
    const updatedWidget: WidgetConfig = {
      ...widget,
      title,
      props,
    };
    onSave(updatedWidget);
    onClose();
  };

  const renderPropEditor = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={props[key] || false}
            onChange={(e) => setProps(prev => ({ ...prev, [key]: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
          <input
            type="number"
            value={props[key] || value}
            onChange={(e) => setProps(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }

    if (typeof value === 'string' && ['line', 'bar', 'pie'].includes(value)) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
          <select
            value={props[key] || value}
            onChange={(e) => setProps(prev => ({ ...prev, [key]: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
          {key.replace(/([A-Z])/g, ' $1')}
        </label>
        <input
          type="text"
          value={props[key] || value}
          onChange={(e) => setProps(prev => ({ ...prev, [key]: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Configure Widget</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Widget title"
            />
          </div>

          {widgetDef.defaultProps && Object.entries(widgetDef.defaultProps).map(([key, value]) => (
            <div key={key}>
              {renderPropEditor(key, value)}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
