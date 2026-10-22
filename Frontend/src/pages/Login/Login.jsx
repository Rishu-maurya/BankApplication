import { useState } from 'react';
import InputField from '../../components/common/InputField';
import { validateEmail, validatePassword } from '../../utils/validators';
import { login, saveSession, isDemoMode } from '../../services/authService';
import './Login.css';

const STEPS = [
  { title: 'Draft', text: 'Journalists write the story', color: '#9aa8cf' },
  { title: 'In review', text: 'Editors check every claim', color: '#f2b544' },
  { title: 'Published', text: 'Readers get verified news', color: '#3cc78b' },
];

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setLoading(true);
    try {
      const session = await login(form);
      saveSession(session, form.remember);
      onLoginSuccess(session);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <aside className="login__panel">
        <div className="login__brand">News Platform</div>
        <div className="login__story">
          <h2 className="login__headline">Every story is checked before it is published.</h2>
          <ol className="flow">
            {STEPS.map((step) => (
              <li key={step.title} style={{ '--dot': step.color }}>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <main className="login__main">
        <div className="card">
          <h1>Log in</h1>
          <p className="card__sub">Welcome back. Enter your details to continue.</p>

          {formError && <div className="alert" role="alert">{formError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              rightSlot={
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />

            <div className="row">
              <label className="check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Keep me logged in
              </label>
              <a className="link" href="#forgot">Forgot password?</a>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="card__foot">
            New here? <a className="link" href="#register">Create an account</a>
          </p>

          {isDemoMode && (
            <p className="demo">
              Demo mode: use editor@news.com (or reader, journalist, admin) with password123.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}