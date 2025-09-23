import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
  theme: localStorage.getItem('theme') || 'light',
  feedbacks: JSON.parse(localStorage.getItem('feedbacks')) || [],
  loading: false,
  error: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    
    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
    
    case 'ADD_FEEDBACK':
      const newFeedback = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'Open',
      };
      const updatedFeedbacks = [...state.feedbacks, newFeedback];
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
      return {
        ...state,
        feedbacks: updatedFeedbacks,
        loading: false,
      };
    
    case 'UPDATE_FEEDBACK':
      const updatedFeedbackList = state.feedbacks.map(feedback =>
        feedback.id === action.payload.id
          ? { ...feedback, ...action.payload.updates }
          : feedback
      );
      localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbackList));
      return {
        ...state,
        feedbacks: updatedFeedbackList,
      };
    
    case 'DELETE_FEEDBACK':
      const filteredFeedbacks = state.feedbacks.filter(
        feedback => feedback.id !== action.payload
      );
      localStorage.setItem('feedbacks', JSON.stringify(filteredFeedbacks));
      return {
        ...state,
        feedbacks: filteredFeedbacks,
      };
    
    case 'UPDATE_PROFILE':
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
        loading: false,
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Apply theme
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const value = {
    ...state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}