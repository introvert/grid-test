# React Grid Layout Widget Dashboard

A modular, production-ready React dashboard application built with react-grid-layout that allows you to easily add, configure, and manage widgets. This project demonstrates a flexible widget system with graph and table widgets rendering mock data, designed for easy extensibility.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-4.5-purple)

## ✨ Features

### 🎯 Core Dashboard Features
- **🖱️ Drag & Drop Interface** - Intuitive widget positioning with react-grid-layout
- **📏 Resizable Widgets** - Dynamic widget sizing with corner handles
- **📱 Responsive Design** - 5-breakpoint system (xxs to lg) for all screen sizes
- **⚙️ Widget Configuration** - Edit widget properties through modal interfaces
- **🎨 Modern UI** - Clean, professional design with Tailwind CSS
- **🔧 Modular Architecture** - Easy to extend with new widget types

### 🧩 Built-in Widgets
- **📈 Line Chart Widget** - Interactive line charts with multiple data series
- **📊 Bar Chart Widget** - Animated bar charts with hover tooltips
- **🥧 Pie Chart Widget** - Percentage-based pie charts with labels
- **📋 Data Table Widget** - Paginated tables with sorting and status indicators

### 🏗️ Developer Experience
- **🔒 Full TypeScript** - Complete type safety throughout the application
- **🚀 Hot Module Replacement** - Instant development feedback
- **📦 Optimized Builds** - Production-ready bundles with code splitting
- **🧪 Comprehensive Testing** - Automated component and functionality tests

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
