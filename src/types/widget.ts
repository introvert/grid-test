import type { Layout } from 'react-grid-layout';

export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  props?: Record<string, any>;
}

export interface WidgetDefinition {
  type: string;
  name: string;
  description: string;
  component: React.ComponentType<WidgetProps>;
  defaultProps?: Record<string, any>;
  defaultSize?: {
    w: number;
    h: number;
  };
  minSize?: {
    w: number;
    h: number;
  };
  maxSize?: {
    w: number;
    h: number;
  };
}

export interface WidgetProps {
  id: string;
  title: string;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
  [key: string]: any;
}

export interface DashboardLayout extends Layout {
  widgetId: string;
}

export interface DashboardState {
  widgets: WidgetConfig[];
  layout: DashboardLayout[];
}
