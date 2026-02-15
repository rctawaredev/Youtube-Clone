# YouTube Clone

A modern YouTube clone built with React and Vite, featuring video browsing, search functionality, and a sleek user interface with dark mode support.

##Features

- **Video Browsing**: Browse videos on the home page with a responsive grid layout
- **Search Functionality**: Search for videos using the search bar
- **Video Categories**: 
  - Home feed
  - Trending videos
  - Gaming videos
- **Video Player**: Watch videos with a built-in video player using React Player
- **Save Videos**: Save your favorite videos to watch later
- **Dark Mode**: Toggle between light and dark themes
- **Authentication**: Protected routes with JWT token-based authentication
- **Responsive Design**: Fully responsive design that works on all devices

##Tech Stack

- **React** (v19.2.0) - UI library
- **Vite** (v7.3.1) - Build tool and dev server
- **React Router DOM** (v7.13.0) - Client-side routing
- **Tailwind CSS** (v4.1.18) - Utility-first CSS framework
- **React Player** (v3.4.0) - Video player component
- **React Icons** (v5.5.0) - Icon library
- **js-cookie** (v3.0.5) - Cookie management
- **React Spinners** (v0.17.0) - Loading spinners

##Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Youtube-Clone
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

##Project Structure

```
Youtube-Clone/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Gaming.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── NavFooter.jsx
│   │   ├── ProtectedLayout.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SavedVideos.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Trending.jsx
│   │   └── VideoDetails.jsx
│   ├── context/
│   │   ├── SavedVideosContext.jsx
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── dist/
├── package.json
├── vite.config.js
└── eslint.config.js
```

##Key Components

- **Home**: Main page with video grid and search functionality
- **VideoDetails**: Individual video page with player and details
- **Trending**: Trending videos page
- **Gaming**: Gaming videos page
- **SavedVideos**: User's saved videos collection
- **Login**: Authentication page
- **ProtectedRoute**: Route protection wrapper
- **ThemeContext**: Dark mode theme management
- **SavedVideosContext**: Saved videos state management

## 🔐 Authentication

The application uses JWT token-based authentication. Users must log in to access protected routes. The JWT token is stored in cookies using `js-cookie`.

##API Integration

The application integrates with the CCBP (Coding Ninjas) API:
- Base URL: `https://apis.ccbp.in/videos`
- Authentication: Bearer token in request headers

##Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

##Author

Created with ❤️ using React and Vite

---

**Note**: This is a clone project created for learning purposes. Make sure you have proper API access and authentication tokens to use all features.
