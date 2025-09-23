import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize mock data if not present
if (!localStorage.getItem('feedbacks')) {
  const mockFeedbacks = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      type: 'Bug',
      rating: 3,
      comment: 'The login page takes too long to load. Please optimize the performance for better user experience.',
      date: '2024-03-15T10:30:00Z',
      status: 'Open',
      userId: '1',
    },
    {
      id: '2',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      type: 'Feature Request',
      rating: 5,
      comment: 'It would be great to have dark mode support for better user experience during night time usage.',
      date: '2024-03-14T14:20:00Z',
      status: 'In Progress',
      userId: '2',
    },
    {
      id: '3',
      name: 'Carol Brown',
      email: 'carol@example.com',
      type: 'General',
      rating: 4,
      comment: 'Overall the application is great! The interface is intuitive and easy to navigate. Keep up the good work.',
      date: '2024-03-13T09:15:00Z',
      status: 'Resolved',
      userId: '1',
    },
    {
      id: '4',
      name: 'David Lee',
      email: 'david@example.com',
      type: 'Bug',
      rating: 2,
      comment: 'The search functionality is not working properly. It returns incorrect results and sometimes crashes.',
      date: '2024-03-12T16:45:00Z',
      status: 'Open',
      userId: '2',
    },
    {
      id: '5',
      name: 'Eva Martinez',
      email: 'eva@example.com',
      type: 'Feature Request',
      rating: 5,
      comment: 'Please add export functionality to download feedback data as CSV or PDF for reporting purposes.',
      date: '2024-03-11T11:30:00Z',
      status: 'In Progress',
      userId: '1',
    },
  ];
  
  localStorage.setItem('feedbacks', JSON.stringify(mockFeedbacks));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
