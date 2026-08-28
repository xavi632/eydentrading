# Admin Dashboard - React + Tailwind CSS

A modern, responsive admin dashboard built with React and Tailwind CSS.

## Features

- 📊 Responsive dashboard layout with sidebar navigation
- 🔍 Search functionality across the top bar
- 📈 Statistics cards with real-time data
- 📋 Interactive data table with sorting and filtering
- 👤 User profile section
- 📱 Mobile-responsive design
- 🎨 Beautiful UI with Tailwind CSS

## Quick Start

### Prerequisites
- Node.js 14.0 or higher
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd react-admin-dashboard

# Install dependencies
npm install

# Start the development server
npm start

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
react-admin-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── StatsCard.jsx
│   │   ├── DataTable.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── tailwind.config.js
```

## Usage

The dashboard includes:

1. **Sidebar Navigation** - Navigate between sections
2. **Top Bar** - Search and user profile
3. **Statistics Cards** - Key metrics display
4. **Data Table** - Recent activity and management
5. **Responsive Design** - Works on all screen sizes

## Customization

Edit `tailwind.config.js` to customize colors and themes.

## License

MIT
