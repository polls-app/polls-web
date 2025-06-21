import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/auth.css';

export default function PasswordResetPage() {
  const [params] = useSearchParams();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate();
  const email = params.get('email') || '';
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [resendMessage, setResendMessage] = useState<string>('');
  const [resendError, setResendError] = useState<boolean>(false);

  useEffect(() => {
    const lastResend = localStorage.getItem('resendCooldown');
    if (lastResend) {
      const secondsPassed = Math.floor((Date.now() - parseInt(lastResend, 10)) / 1000);
      const cooldown = 60 - secondsPassed;
      if (cooldown > 0) setResendCooldown(cooldown);
    }
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    const response = await fetch(`https://localhost:7277/api/v1/auth/password-reset-request?email=${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      setResendMessage('Verification code resent to your email.');
      setResendError(false);
      const timestamp = Date.now().toString();
      localStorage.setItem('resendCooldown', timestamp);
      setResendCooldown(60);
    } else {
      setResendMessage('Failed to resend verification code.');
      setResendError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (repeatNewPassword !== newPassword) {
      setErrors({ RepeatNewPassword: ["Passwords do not match."] });
      return;
    }

    const response = await fetch(`https://localhost:7277/api/v1/auth/password-reset?token=${code}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword, repeatNewPassword })
    });

    if (response.ok) {
      navigate('/login');
    } else {
      try {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          setErrors({ general: [errorData.Message || "Reset password failed."] });
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
        <h2 className="auth-title">Enter Reset Code</h2>

        {renderErrors("general")}
        {renderErrors("Token")}
        <input
          className="auth-input"
          type="text"
          maxLength={8}
          placeholder="Enter 8-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        {renderErrors("NewPassword")}
        <input
          className="auth-input"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        {renderErrors("RepeatNewPassword")}
        <input
          className="auth-input"
          type="password"
          placeholder="Repeat Password"
          value={repeatNewPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        <button className="auth-button" type="submit">Reset Password</button>
        <span
          className="auth-link"
          onClick={handleResend}
          style={{ pointerEvents: resendCooldown > 0 ? 'none' : 'auto', opacity: resendCooldown > 0 ? 0.5 : 1 }}
        >
          {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend verification code'}
        </span>
        {resendMessage && (
          <p className={resendError ? 'auth-message-error' : 'auth-message-success'}>{resendMessage}</p>
        )}
      </form>
    </div>
  );
}