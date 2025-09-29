import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { WidgetWrapper } from '../components/WidgetWrapper';
import type { WidgetProps } from '../types/widget';

// Mock data generators
const generateLineData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    name: month,
    value: Math.floor(Math.random() * 1000) + 100,
    value2: Math.floor(Math.random() * 800) + 50,
  }));
};

const generateBarData = () => {
  const categories = ['A', 'B', 'C', 'D', 'E'];
  return categories.map(cat => ({
    name: cat,
    value: Math.floor(Math.random() * 500) + 50,
  }));
};

const generatePieData = () => {
  const segments = ['Desktop', 'Mobile', 'Tablet'];
  return segments.map((segment, index) => ({
    name: segment,
    value: Math.floor(Math.random() * 100) + 20,
    color: ['#8884d8', '#82ca9d', '#ffc658'][index],
  }));
};

interface GraphWidgetProps extends WidgetProps {
  chartType?: 'line' | 'bar' | 'pie';
}

export const GraphWidget: React.FC<GraphWidgetProps> = ({
  id,
  title,
  onRemove,
  onEdit,
  chartType = 'line',
}) => {
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generateBarData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        const pieData = generatePieData();
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }: any) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={generateLineData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="value2" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
      <div className="h-full min-h-[200px]">
        {renderChart()}
      </div>
    </WidgetWrapper>
  );
};
