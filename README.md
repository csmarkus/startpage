# Startpage

A modern, customizable browser startpage built with React, TypeScript, and Vite. Features a clean interface with dynamic backgrounds, productivity tools, and keyboard shortcuts for a streamlined browsing experience.

## Features

- 🔍 **Smart Search Bar** - Command-based interface for quick navigation and actions
- 🔖 **Bookmarks Manager** - Organize and access your favorite websites
- ✅ **Todo List** - Keep track of tasks and stay productive
- 📝 **Notes** - Quick note-taking functionality
- ⏱️ **Pomodoro Timer** - Built-in focus timer for better time management
- 🎨 **Dynamic Backgrounds** - Beautiful background images from Unsplash API
- ⌨️ **Keyboard Shortcuts** - Navigate efficiently without touching your mouse
- 🌓 **Theme Support** - Light and dark mode theming
- ⚙️ **Customizable Settings** - Personalize your experience
- 💾 **Persistent Storage** - Your data stays saved locally

## Tech Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Docker** - Containerized deployment with Nginx

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/csmarkus/startpage.git
cd startpage

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Create a production build
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Docker Deployment

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t startpage .

# Run the container
docker run -p 8080:80 startpage
```

The application will be available at `http://localhost:8080`

## Configuration

### Unsplash API Key

To enable dynamic backgrounds, you'll need an Unsplash API key:

1. Visit [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key
4. Open the startpage and navigate to Settings (keyboard shortcut or command)
5. Paste your API key in the settings

### Background Query

Customize the background images by setting a custom search query in the Settings panel (e.g., "nature", "mountains", "minimal").

## Keyboard Shortcuts

The application supports various keyboard shortcuts for quick navigation between different views.  Check the application for the complete list of available shortcuts.

## License

This project is private and not licensed for public use.

## Author

[csmarkus](https://github.com/csmarkus)
