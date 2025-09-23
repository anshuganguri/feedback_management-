# Feedback Management System

A modern, responsive feedback management system built with React, featuring authentication, dashboard analytics, and comprehensive feedback handling capabilities.

## 🚀 Features

### Authentication
- **Login & Signup** with email/password
- **Social Login** options (Google, LinkedIn) - UI ready
- **Form validation** with error messages
- **Protected routes** and session management

### Dashboard
- **Welcome banner** with personalized greeting
- **Statistics overview** (total feedback, ratings, status counts)
- **Quick actions** for easy navigation
- **Recent feedback** preview
- **Feedback type distribution** charts

### Feedback Management
- **Submit Feedback** with comprehensive form
  - Name, email, feedback type selection
  - 5-star rating system
  - Comment box with validation
  - Success/failure notifications
- **View Feedback** with advanced features
  - Search by name, email, or comment
  - Filter by type, status, rating, date
  - Sort by multiple criteria
  - Pagination with 10 items per page
  - Status updates and actions menu

### Analytics
- **Interactive Charts** using Chart.js
  - Bar chart: Feedback by type
  - Pie chart: Status distribution
  - Line chart: Feedback timeline
  - Bar chart: Rating distribution
- **Sentiment Analysis** with visual indicators
- **Key Metrics** dashboard
- **Trend Analysis** with week-over-week comparisons

### Settings
- **Profile Management**
  - Update name, email, bio
  - Avatar placeholder with initials
  - Form validation
- **Security Settings**
  - Change password with validation
  - Account export functionality
  - Account deletion option
- **Preferences**
  - Light/Dark theme toggle
  - Notification preferences
  - Customizable settings

## 🎨 UI/UX Features

### Design
- **Tailwind CSS** for modern styling
- **Responsive design** (mobile, tablet, desktop)
- **Dark mode** support with theme persistence
- **Clean card-based layout**
- **Consistent color scheme** with primary branding

### User Experience
- **Toast notifications** for all actions
- **Loading states** and error handling
- **Form validation** with real-time feedback
- **Smooth transitions** and hover effects
- **Accessible navigation** with keyboard support

### Icons & Visual Elements
- **React Icons** for consistent iconography
- **Interactive elements** with visual feedback
- **Status badges** with color coding
- **Star ratings** with interactive selection
- **Progress indicators** and charts

## 🛠 Technology Stack

### Frontend
- **React 18+** with functional components and hooks
- **React Router** for navigation
- **React Hook Form** for form management
- **Tailwind CSS** for styling
- **Chart.js + React Chart.js 2** for analytics
- **React Hot Toast** for notifications
- **React Icons** for iconography

### State Management
- **Context API** with useReducer for global state
- **Local Storage** for data persistence
- **Custom hooks** for reusable logic

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code quality
- **PostCSS** for CSS processing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Navbar.jsx      # Top navigation bar
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Login.jsx       # Authentication
│   ├── Signup.jsx      # User registration
│   ├── Dashboard.jsx   # Main dashboard
│   ├── SubmitFeedback.jsx
│   ├── ViewFeedback.jsx
│   ├── Analytics.jsx   # Charts and insights
│   └── Settings.jsx    # User preferences
├── context/            # State management
│   └── AppContext.jsx  # Global app state
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
│   └── helpers.js      # Date formatting, validation
├── data/               # Mock data and constants
│   └── mockData.js     # Sample data
└── App.jsx            # Main app component
```

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd feedback-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Use demo credentials or create a new account

### Demo Credentials
- **Email:** admin@example.com
- **Password:** password123

Or use any valid email/password combination for demo purposes.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Features Walkthrough

### 1. Authentication Flow
- Visit login page
- Use demo credentials or sign up
- Automatic redirect to dashboard upon success

### 2. Dashboard Overview
- View key metrics and statistics
- Access quick actions
- Review recent feedback submissions

### 3. Submit Feedback
- Fill out comprehensive feedback form
- Select feedback type and rating
- Submit with validation and confirmation

### 4. Manage Feedback
- Search and filter feedback entries
- Update status and manage entries
- Paginate through large datasets

### 5. Analytics Insights
- View interactive charts and graphs
- Analyze feedback trends and patterns
- Monitor sentiment and ratings

### 6. Customize Settings
- Update profile information
- Change password securely
- Toggle between light and dark themes
- Configure notification preferences

## 🎯 Mock Data

The application includes sample feedback data for demonstration:
- 5 sample feedback entries
- Different types (Bug, Feature Request, General)
- Various statuses and ratings
- Realistic timestamps and user data

## 🌟 Key Features Implementation

### State Management
- Global state with Context API and useReducer
- Local storage persistence
- Optimistic updates with error handling

### Form Handling
- React Hook Form for validation
- Real-time field validation
- Error state management

### Responsive Design
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions

### Theme Support
- CSS custom properties
- System preference detection
- Smooth theme transitions

## 📝 Future Enhancements

- Real API integration
- File upload for feedback attachments
- Advanced filtering and search
- Email notifications
- Bulk actions for feedback management
- Export functionality (CSV, PDF)
- Role-based access control
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies.**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
