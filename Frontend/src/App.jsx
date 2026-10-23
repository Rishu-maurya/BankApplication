import { useState } from 'react';
import Login from './pages/Login/Login';
import { getSession, clearSession } from './services/authService';

const NEXT_PAGE = {
  reader: 'Home',
  journalist: 'Write article',
  editor: 'Review articles',
  admin: 'Admin dashboard',
};

export default function App() {
  const [session, setSession] = useState(getSession());

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  if (!session) return <Login onLoginSuccess={setSession} />;

  return (
    <main className="welcome">
      <h1>Welcome, {session.user.name}</h1>
      <p>
        You are logged in as {session.user.role}. Next page: {NEXT_PAGE[session.user.role]}.
      </p>
      <button type="button" onClick={handleLogout}>Log out</button>
    </main>
  );
}
