# 🧩 Widget Examples - Extending the Dashboard

This document provides comprehensive examples of how to create different types of widgets for the React Grid Layout Widget Dashboard.

## 🎯 Basic Widget Template

Every widget follows this basic structure:

```tsx
import React from 'react';
import { WidgetWrapper } from '../components/WidgetWrapper';
import type { WidgetProps } from '../types/widget';

interface MyWidgetProps extends WidgetProps {
  // Add your custom props here
  customProp?: string;
  numericProp?: number;
  booleanProp?: boolean;
}

export const MyWidget: React.FC<MyWidgetProps> = ({
  id,
  title,
  onRemove,
  onEdit,
  customProp = 'default',
  numericProp = 100,
  booleanProp = true,
}) => {
  return (
    <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
      {/* Your widget content here */}
    </WidgetWrapper>
  );
};
```

## 📊 Example 1: KPI Metric Widget

```tsx
// src/widgets/KPIWidget.tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { WidgetWrapper } from '../components/WidgetWrapper';
import type { WidgetProps } from '../types/widget';

interface KPIWidgetProps extends WidgetProps {
  metric?: string;
  value?: number;
  previousValue?: number;
  unit?: string;
  format?: 'number' | 'currency' | 'percentage';
  showTrend?: boolean;
  color?: 'blue' | 'green' | 'red' | 'purple';
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({
  id, title, onRemove, onEdit,
  metric = 'Revenue',
  value = 12500,
  previousValue = 11200,
  unit = '$',
  format = 'currency',
  showTrend = true,
  color = 'blue',
}) => {
  const trend = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency': return `${unit}${val.toLocaleString()}`;
      case 'percentage': return `${val.toFixed(1)}%`;
      default: return `${val.toLocaleString()}${unit}`;
    }
  };

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const trendColor = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-400';
  const bgColor = `bg-${color}-50`;
  const textColor = `text-${color}-600`;

  return (
    <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
      <div className={`h-full ${bgColor} rounded-lg p-4 flex flex-col justify-center`}>
        <div className="text-center">
          <div className={`text-3xl font-bold ${textColor} mb-2`}>
            {formatValue(value)}
          </div>
          <div className="text-sm text-gray-600 mb-3">{metric}</div>
          
          {showTrend && (
            <div className={`flex items-center justify-center text-sm ${trendColor}`}>
              <TrendIcon size={16} className="mr-1" />
              <span>{Math.abs(trend).toFixed(1)}%</span>
              <span className="ml-1 text-gray-500">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  );
};

// Registration
widgetRegistry.register({
  type: 'kpi-metric',
  name: 'KPI Metric',
  description: 'Display key performance indicators with trend analysis',
  component: KPIWidget,
  defaultProps: {
    metric: 'Revenue',
    value: 12500,
    previousValue: 11200,
    unit: '$',
    format: 'currency',
    showTrend: true,
    color: 'blue',
  },
  defaultSize: { w: 3, h: 3 },
  minSize: { w: 2, h: 2 },
  maxSize: { w: 4, h: 4 },
});
```

## 📈 Example 2: Progress Bar Widget

```tsx
// src/widgets/ProgressWidget.tsx
import React from 'react';
import { WidgetWrapper } from '../components/WidgetWrapper';
import type { WidgetProps } from '../types/widget';

interface ProgressWidgetProps extends WidgetProps {
  progress?: number;
  target?: number;
  label?: string;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
  showPercentage?: boolean;
  showValues?: boolean;
  animated?: boolean;
}

export const ProgressWidget: React.FC<ProgressWidgetProps> = ({
  id, title, onRemove, onEdit,
  progress = 75,
  target = 100,
  label = 'Completion',
  color = 'blue',
  showPercentage = true,
  showValues = false,
  animated = true,
}) => {
  const percentage = Math.min((progress / target) * 100, 100);
  const isComplete = progress >= target;

  return (
    <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
      <div className="h-full flex flex-col justify-center p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            {showPercentage && (
              <span className={`text-sm font-semibold ${isComplete ? 'text-green-600' : `text-${color}-600`}`}>
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''} ${
                isComplete ? 'bg-green-500' : `bg-${color}-500`
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {showValues && (
          <div className="text-center">
            <span className="text-lg font-semibold text-gray-900">
              {progress.toLocaleString()}
            </span>
            <span className="text-gray-500"> / {target.toLocaleString()}</span>
          </div>
        )}

        {isComplete && (
          <div className="text-center text-green-600 text-sm font-medium mt-2">
            ✓ Target Achieved!
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
};

// Registration
widgetRegistry.register({
  type: 'progress-bar',
  name: 'Progress Bar',
  description: 'Display progress towards goals with visual indicators',
  component: ProgressWidget,
  defaultProps: {
    progress: 75,
    target: 100,
    label: 'Completion',
    color: 'blue',
    showPercentage: true,
    showValues: false,
    animated: true,
  },
  defaultSize: { w: 4, h: 2 },
  minSize: { w: 3, h: 2 },
  maxSize: { w: 6, h: 3 },
});
```

## 📅 Example 3: Calendar Widget

```tsx
// src/widgets/CalendarWidget.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WidgetWrapper } from '../components/WidgetWrapper';
import type { WidgetProps } from '../types/widget';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  color?: string;
}

interface CalendarWidgetProps extends WidgetProps {
  events?: CalendarEvent[];
  highlightToday?: boolean;
  showWeekends?: boolean;
  compactMode?: boolean;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  id, title, onRemove, onEdit,
  events = [
    { id: '1', title: 'Meeting', date: '2024-01-15', color: 'blue' },
    { id: '2', title: 'Deadline', date: '2024-01-20', color: 'red' },
  ],
  highlightToday = true,
  showWeekends = true,
  compactMode = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = showWeekends 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const filteredDays = showWeekends ? days : days.filter(day => day.getDay() !== 0 && day.getDay() !== 6);

  const hasEvent = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.some(event => event.date === dateStr);
  };

  const isToday = (date: Date) => {
    return highlightToday && 
           date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month;
  };

  return (
    <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
      <div className="h-full flex flex-col p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={16} />
          </button>
          
          <h3 className={`font-semibold ${compactMode ? 'text-sm' : 'text-base'}`}>
            {monthNames[month]} {year}
          </h3>
          
          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day headers */}
        <div className={`grid ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'} gap-1 mb-2`}>
          {dayNames.map(day => (
            <div key={day} className={`text-center font-medium text-gray-500 ${compactMode ? 'text-xs' : 'text-sm'}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className={`grid ${showWeekends ? 'grid-cols-7' : 'grid-cols-5'} gap-1 flex-1`}>
          {filteredDays.slice(0, showWeekends ? 35 : 25).map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center rounded text-center cursor-pointer
                ${compactMode ? 'text-xs' : 'text-sm'}
                ${isCurrentMonth(day) ? 'text-gray-900' : 'text-gray-400'}
                ${isToday(day) ? 'bg-blue-500 text-white font-bold' : 'hover:bg-gray-100'}
                ${hasEvent(day) ? 'ring-2 ring-green-400' : ''}
              `}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
};

// Registration
widgetRegistry.register({
  type: 'calendar',
  name: 'Calendar',
  description: 'Display calendar with events and navigation',
  component: CalendarWidget,
  defaultProps: {
    events: [
      { id: '1', title: 'Meeting', date: '2024-01-15', color: 'blue' },
      { id: '2', title: 'Deadline', date: '2024-01-20', color: 'red' },
    ],
    highlightToday: true,
    showWeekends: true,
    compactMode: false,
  },
  defaultSize: { w: 4, h: 5 },
  minSize: { w: 3, h: 4 },
  maxSize: { w: 6, h: 6 },
});
```

## 🎨 Example 4: Status List Widget

```tsx
// src/widgets/StatusListWidget.tsx
import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { WidgetWrapper } from '../components/WidgetWrapper';
import type { WidgetProps } from '../types/widget';

interface StatusItem {
  id: string;
  title: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  timestamp?: string;
  description?: string;
}

interface StatusListWidgetProps extends WidgetProps {
  items?: StatusItem[];
  maxItems?: number;
  showTimestamp?: boolean;
  showDescription?: boolean;
  autoRefresh?: boolean;
}

export const StatusListWidget: React.FC<StatusListWidgetProps> = ({
  id, title, onRemove, onEdit,
  items = [
    { id: '1', title: 'Database Connection', status: 'success', timestamp: '2 min ago' },
    { id: '2', title: 'API Gateway', status: 'success', timestamp: '5 min ago' },
    { id: '3', title: 'Cache Server', status: 'warning', timestamp: '10 min ago' },
    { id: '4', title: 'Background Jobs', status: 'error', timestamp: '15 min ago' },
  ],
  maxItems = 5,
  showTimestamp = true,
  showDescription = false,
  autoRefresh = false,
}) => {
  const getStatusIcon = (status: StatusItem['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="text-green-500" size={16} />;
      case 'error': return <XCircle className="text-red-500" size={16} />;
      case 'warning': return <AlertCircle className="text-yellow-500" size={16} />;
      case 'pending': return <Clock className="text-blue-500" size={16} />;
    }
  };

  const getStatusColor = (status: StatusItem['status']) => {
    switch (status) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'pending': return 'border-blue-200 bg-blue-50';
    }
  };

  const displayItems = items.slice(0, maxItems);

  return (
    <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
      <div className="h-full overflow-auto">
        <div className="space-y-2 p-2">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border ${getStatusColor(item.status)} transition-colors`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className="text-sm font-medium text-gray-900">
                    {item.title}
                  </span>
                </div>
                {showTimestamp && item.timestamp && (
                  <span className="text-xs text-gray-500">
                    {item.timestamp}
                  </span>
                )}
              </div>
              
              {showDescription && item.description && (
                <p className="text-xs text-gray-600 mt-1 ml-6">
                  {item.description}
                </p>
              )}
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Clock size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No status items</p>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  );
};

// Registration
widgetRegistry.register({
  type: 'status-list',
  name: 'Status List',
  description: 'Display system status and monitoring information',
  component: StatusListWidget,
  defaultProps: {
    items: [
      { id: '1', title: 'Database Connection', status: 'success', timestamp: '2 min ago' },
      { id: '2', title: 'API Gateway', status: 'success', timestamp: '5 min ago' },
      { id: '3', title: 'Cache Server', status: 'warning', timestamp: '10 min ago' },
    ],
    maxItems: 5,
    showTimestamp: true,
    showDescription: false,
    autoRefresh: false,
  },
  defaultSize: { w: 4, h: 4 },
  minSize: { w: 3, h: 3 },
  maxSize: { w: 6, h: 6 },
});
```

## 🔧 Widget Registration Best Practices

1. **Consistent Naming**: Use kebab-case for widget types
2. **Sensible Defaults**: Provide meaningful default props
3. **Size Constraints**: Set appropriate min/max sizes
4. **Type Safety**: Always extend `WidgetProps` interface
5. **Responsive Design**: Consider mobile layouts
6. **Performance**: Use React.memo for expensive widgets
7. **Accessibility**: Include proper ARIA labels

## 📝 Configuration Tips

- **Boolean props** automatically become checkboxes
- **Number props** become number inputs with validation
- **String props** become text inputs
- **Enum-like strings** become dropdown selects
- Use descriptive prop names for better UX

## 🎯 Next Steps

After creating your widgets:

1. **Test thoroughly** on different screen sizes
2. **Add error boundaries** for production use
3. **Implement data fetching** for real-world use cases
4. **Add loading states** for better UX
5. **Consider accessibility** requirements
6. **Document your widgets** for team members

This modular system makes it incredibly easy to build a comprehensive dashboard with any type of widget you can imagine!
