import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (repeatPassword !== password) {
      setErrors({ RepeatPassword: ["Passwords do not match."] });
      return;
    }

    const response = await fetch('https://localhost:7277/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, repeatPassword })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = "/verify";
    } else {
      try {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          setErrors({ general: [errorData.Message || "Registration failed."] });
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
          <h2 className="auth-title">Register</h2>
  
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

          {renderErrors("RepeatPassword")}
          <input
            className="auth-input"
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">Sign Up</button>
          <Link className="auth-link" to="/login">Already have an account? Login</Link>
        </form>
      </div>
    );
}