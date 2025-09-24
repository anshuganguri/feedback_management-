const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Request failed: ${response.status}`);
  }
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return null;
}

export const api = {
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async signup({ name, email, password }) {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(res);
  },

  async createFeedback(payload) {
    const res = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async searchFeedback({ q, status, type, page = 0, size = 10, sortBy = 'date' }) {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (status && status !== 'all') params.set('status', status);
    if (type && type !== 'all') params.set('type', type);
    params.set('page', String(page));
    params.set('size', String(size));
    params.set('sortBy', sortBy);
    const res = await fetch(`${API_BASE_URL}/api/feedback?${params.toString()}`);
    return handleResponse(res);
  },

  async updateFeedbackStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/api/feedback/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(res);
  },

  async deleteFeedback(id) {
    const res = await fetch(`${API_BASE_URL}/api/feedback/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
  },
};

export default api;


