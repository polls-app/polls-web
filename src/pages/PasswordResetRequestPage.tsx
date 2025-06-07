import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`https://localhost:7277/api/v1/auth/password-reset-request?email=${encodeURIComponent(email)}`, {
      method: 'POST'
    });
    navigate(`/password-reset?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRequest}>
        <h2 className="auth-title">Reset Password</h2>
        <input
          className="auth-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Send Reset Code</button>
      </form>
    </div>
  );
}