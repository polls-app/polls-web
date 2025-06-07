import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/auth.css';

export default function PasswordResetPage() {
  const [params] = useSearchParams();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const email = params.get('email') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`https://localhost:7277/api/v1/auth/password-reset?token=${code}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2 className="auth-title">Enter Reset Code</h2>
        <input
          className="auth-input"
          type="text"
          maxLength={8}
          placeholder="Enter 8-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Reset Password</button>
      </form>
    </div>
  );
}