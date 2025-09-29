import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { Plus } from 'lucide-react';
import type { WidgetConfig, DashboardLayout, DashboardState } from '../types/widget';
import { widgetRegistry } from '../widgets';
import { WidgetConfigModal } from './WidgetConfigModal';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Initial dashboard state with some demo widgets
const initialState: DashboardState = {
  widgets: [
    {
      id: 'widget-1',
      type: 'line-chart',
      title: 'Sales Trends',
    },
    {
      id: 'widget-2',
      type: 'data-table',
      title: 'User Data',
    },
    {
      id: 'widget-3',
      type: 'bar-chart',
      title: 'Revenue by Category',
    },
    {
      id: 'widget-4',
      type: 'pie-chart',
      title: 'Traffic Sources',
    },
  ],
  layout: [
    { i: 'widget-1', x: 0, y: 0, w: 6, h: 4, widgetId: 'widget-1' },
    { i: 'widget-2', x: 6, y: 0, w: 6, h: 6, widgetId: 'widget-2' },
    { i: 'widget-3', x: 0, y: 4, w: 6, h: 4, widgetId: 'widget-3' },
    { i: 'widget-4', x: 6, y: 6, w: 4, h: 4, widgetId: 'widget-4' },
  ],
};

export const Dashboard: React.FC = () => {
  const [dashboardState, setDashboardState] = useState<DashboardState>(initialState);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [configWidget, setConfigWidget] = useState<WidgetConfig | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleLayoutChange = useCallback((layout: Layout[]) => {
    const newLayout: DashboardLayout[] = layout.map(item => ({
      ...item,
      widgetId: item.i,
    }));
    
    setDashboardState(prev => ({
      ...prev,
      layout: newLayout,
    }));
  }, []);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    setDashboardState(prev => ({
      widgets: prev.widgets.filter(w => w.id !== widgetId),
      layout: prev.layout.filter(l => l.widgetId !== widgetId),
    }));
  }, []);

  const handleAddWidget = useCallback((type: string) => {
    const widgetDef = widgetRegistry.get(type);
    if (!widgetDef) return;

    const newWidgetId = `widget-${Date.now()}`;
    const newWidget: WidgetConfig = {
      id: newWidgetId,
      type,
      title: widgetDef.name,
      props: widgetDef.defaultProps,
    };

    const newLayoutItem: DashboardLayout = {
      i: newWidgetId,
      x: 0,
      y: 0,
      w: widgetDef.defaultSize?.w || 4,
      h: widgetDef.defaultSize?.h || 3,
      widgetId: newWidgetId,
    };

    setDashboardState(prev => ({
      widgets: [...prev.widgets, newWidget],
      layout: [...prev.layout, newLayoutItem],
    }));

    setShowAddWidget(false);
  }, []);

  const handleEditWidget = useCallback((widgetId: string) => {
    const widget = dashboardState.widgets.find(w => w.id === widgetId);
    if (widget) {
      setConfigWidget(widget);
      setShowConfigModal(true);
    }
  }, [dashboardState.widgets]);

  const handleSaveWidget = useCallback((updatedWidget: WidgetConfig) => {
    setDashboardState(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => w.id === updatedWidget.id ? updatedWidget : w),
    }));
  }, []);

  const renderWidget = (widget: WidgetConfig) => {
    const widgetDef = widgetRegistry.get(widget.type);
    if (!widgetDef) return <div>Widget type not found: {widget.type}</div>;

    const WidgetComponent = widgetDef.component;
    return (
      <WidgetComponent
        key={widget.id}
        id={widget.id}
        title={widget.title}
        onRemove={handleRemoveWidget}
        onEdit={handleEditWidget}
        {...(widget.props || {})}
        {...(widgetDef.defaultProps || {})}
      />
    );
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => setShowAddWidget(!showAddWidget)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Widget
          </button>
        </div>
        
        {/* Add Widget Panel */}
        {showAddWidget && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Available Widgets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {widgetRegistry.getAll().map(widgetDef => (
                <button
                  key={widgetDef.type}
                  onClick={() => handleAddWidget(widgetDef.type)}
                  className="p-3 text-left bg-white border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900">{widgetDef.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{widgetDef.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="flex-1 p-6 overflow-auto">
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: dashboardState.layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          onLayoutChange={handleLayoutChange}
          isDraggable={true}
          isResizable={true}
          margin={[16, 16]}
          containerPadding={[0, 0]}
        >
          {dashboardState.widgets.map(widget => (
            <div key={widget.id}>
              {renderWidget(widget)}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

      {/* Widget Configuration Modal */}
      <WidgetConfigModal
        widget={configWidget}
        isOpen={showConfigModal}
        onClose={() => {
          setShowConfigModal(false);
          setConfigWidget(null);
        }}
        onSave={handleSaveWidget}
      />
    </div>
  );
};
