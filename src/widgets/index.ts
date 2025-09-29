import { widgetRegistry } from './registry';
import { GraphWidget } from './GraphWidget';
import { TableWidget } from './TableWidget';

// Register all widgets
widgetRegistry.register({
  type: 'line-chart',
  name: 'Line Chart',
  description: 'Display data as a line chart',
  component: GraphWidget,
  defaultProps: { chartType: 'line' },
  defaultSize: { w: 6, h: 4 },
  minSize: { w: 4, h: 3 },
});

widgetRegistry.register({
  type: 'bar-chart',
  name: 'Bar Chart',
  description: 'Display data as a bar chart',
  component: GraphWidget,
  defaultProps: { chartType: 'bar' },
  defaultSize: { w: 6, h: 4 },
  minSize: { w: 4, h: 3 },
});

widgetRegistry.register({
  type: 'pie-chart',
  name: 'Pie Chart',
  description: 'Display data as a pie chart',
  component: GraphWidget,
  defaultProps: { chartType: 'pie' },
  defaultSize: { w: 4, h: 4 },
  minSize: { w: 3, h: 3 },
});

widgetRegistry.register({
  type: 'data-table',
  name: 'Data Table',
  description: 'Display data in a tabular format',
  component: TableWidget,
  defaultProps: { showPagination: true, rowsPerPage: 8 },
  defaultSize: { w: 8, h: 6 },
  minSize: { w: 6, h: 4 },
});

export { widgetRegistry };
export * from './GraphWidget';
export * from './TableWidget';
