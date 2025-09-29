# React Grid Layout Widget Dashboard

A modular React dashboard application built with react-grid-layout that allows you to easily add, configure, and manage widgets. This project demonstrates a flexible widget system with graph and table widgets rendering mock data.

## Features

- **Drag & Drop Interface**: Powered by react-grid-layout for intuitive widget positioning
- **Modular Widget System**: Easy to add new widget types through a registry pattern
- **Responsive Design**: Adapts to different screen sizes with responsive grid layouts
- **Widget Configuration**: Edit widget properties through a modal interface
- **Built-in Widgets**:
  - Line Chart Widget (using Recharts)
  - Bar Chart Widget (using Recharts)
  - Pie Chart Widget (using Recharts)
  - Data Table Widget with pagination
- **Modern UI**: Built with Tailwind CSS for clean, professional styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard component
│   ├── WidgetWrapper.tsx      # Base wrapper for all widgets
│   └── WidgetConfigModal.tsx  # Modal for widget configuration
├── widgets/
│   ├── registry.ts            # Widget registry system
│   ├── GraphWidget.tsx        # Chart widgets (line, bar, pie)
│   ├── TableWidget.tsx        # Data table widget
│   └── index.ts              # Widget exports and registration
├── types/
│   └── widget.ts             # TypeScript interfaces
└── App.tsx                   # Main application component
```

## Adding New Widgets

To add a new widget type:

1. **Create the Widget Component**:
   ```tsx
   // src/widgets/MyWidget.tsx
   import React from 'react';
   import { WidgetWrapper } from '../components/WidgetWrapper';
   import { WidgetProps } from '../types/widget';

   interface MyWidgetProps extends WidgetProps {
     // Add custom props here
   }

   export const MyWidget: React.FC<MyWidgetProps> = ({ id, title, onRemove, onEdit }) => {
     return (
       <WidgetWrapper title={title} id={id} onRemove={onRemove} onEdit={onEdit}>
         {/* Your widget content here */}
       </WidgetWrapper>
     );
   };
   ```

2. **Register the Widget**:
   ```tsx
   // src/widgets/index.ts
   import { MyWidget } from './MyWidget';

   widgetRegistry.register({
     type: 'my-widget',
     name: 'My Widget',
     description: 'Description of my widget',
     component: MyWidget,
     defaultProps: { /* default props */ },
     defaultSize: { w: 4, h: 3 },
     minSize: { w: 2, h: 2 },
   });
   ```

## Widget Configuration

Widgets can be configured through the edit button in their header. The configuration modal automatically generates form fields based on the widget's default properties:

- Boolean properties become checkboxes
- Number properties become number inputs
- String properties become text inputs
- Special handling for chart types (line, bar, pie)

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **react-grid-layout** for drag-and-drop grid functionality
- **Recharts** for chart components
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is open source and available under the MIT License.
