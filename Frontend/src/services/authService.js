import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const SESSION_KEY = 'news_session';

const DEMO_USERS = {
  'reader@news.com': { name: 'Riya', role: 'reader' },
  'journalist@news.com': { name: 'Jay', role: 'journalist' },
  'editor@news.com': { name: 'Esha', role: 'editor' },
  'admin@news.com': { name: 'Arun', role: 'admin' },
};
const DEMO_PASSWORD = 'password123';

export const isDemoMode = !API_URL;

export async function login({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();

  if (isDemoMode) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const user = DEMO_USERS[cleanEmail];
    if (!user || password !== DEMO_PASSWORD) {
      throw new Error('Incorrect email or password. Check both and try again.');
    }
    return { token: 'demo-token', user: { email: cleanEmail, ...user } };
  }

  try {
    const { data } = await axios.post(`${API_URL}/api/auth/login`, {
      email: cleanEmail,
      password,
    });
    return data;
  } catch (err) {
    const message = err.response
      ? err.response.data?.message || 'Incorrect email or password. Check both and try again.'
      : 'Cannot reach the server. Check your connection and try again.';
    throw new Error(message);
  }
}

export function saveSession(session, remember) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
