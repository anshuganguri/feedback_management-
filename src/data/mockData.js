export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'user',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'admin',
    createdAt: '2024-01-10T08:00:00Z',
  },
];

export const mockFeedbacks = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    type: 'Bug',
    rating: 3,
    comment: 'The login page takes too long to load. Please optimize the performance.',
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
    comment: 'It would be great to have dark mode support for better user experience during night time.',
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
    comment: 'Overall the application is great! The interface is intuitive and easy to navigate.',
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
    comment: 'The search functionality is not working properly. It returns incorrect results.',
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
    comment: 'Please add export functionality to download feedback data as CSV or PDF.',
    date: '2024-03-11T11:30:00Z',
    status: 'In Progress',
    userId: '1',
  },
];

export const feedbackTypes = ['Bug', 'Feature Request', 'General'];
export const feedbackStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
export const ratingOptions = [1, 2, 3, 4, 5];