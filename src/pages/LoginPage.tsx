import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const response = await fetch('https://localhost:7277/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = "/";
    } else {
      try {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          setErrors({ general: [errorData.Message || "Login failed."] });
        }
      } catch {
        setErrors({ general: ["Unexpected error occurred."] });
      }
    }
  };

  const renderErrors = (field: string) =>
    errors[field]?.map((msg, idx) => (
      <p key={idx} className="auth-error">{msg}</p>
    ));

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>

        {renderErrors("general")}
        {renderErrors("Email")}
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {renderErrors("Password")}
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-button" type="submit">Sign In</button>
        <Link className="auth-link" to="/register">Don’t have an account? Register</Link>
        <Link className="auth-link" to="/password-reset-request">Forgot password?</Link>
      </form>
    </div>
  );
}