import { useEffect, useRef, useState } from 'react';
import '../styles/auth.css';

export default function VerifyPage() {
  const codeLength = 6;
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
  const [token, setToken] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string>('');
  const [resendError, setResendError] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [invalidToken, setInvalidToken] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      setToken(stored);
    }
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

  const submitToken = async (tokenCode: string) => {
    if (!token || tokenCode.length !== codeLength) return;
    const response = await fetch('https://localhost:7277/api/v1/auth/confirm-email', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token: tokenCode })
    });
    if (response.ok) {
      const data = await response.json();
      setTimeout(() => {
        localStorage.setItem('token', data.token);
        window.location.href = "/";
      }, 0);
    } else {
      setInvalidToken(true);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]{0,6}$/.test(value)) return;
    const updated = [...code];

    if (value.length === 1) {
      updated[index] = value;
      setCode(updated);
      setInvalidToken(false);
      if (index < codeLength - 1) inputRefs.current[index + 1]?.focus();
    } else if (value.length === codeLength) {
      // Handle paste full token
      const chars = value.split('').slice(0, codeLength);
      setCode(chars);
      setInvalidToken(false);
      chars.forEach((ch, i) => {
        if (inputRefs.current[i]) inputRefs.current[i].value = ch;
      });
      submitToken(chars.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const updated = [...code];
      if (code[index]) {
        updated[index] = '';
        setCode(updated);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  useEffect(() => {
    const tokenCode = code.join('');
    if (tokenCode.length === codeLength) submitToken(tokenCode);
  }, [code]);

  const handleResend = async () => {
    if (!token || resendCooldown > 0) return;
    const response = await fetch('https://localhost:7277/api/v1/auth/resend-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={(e) => e.preventDefault()}>
        <h2 className="auth-title">Email Verification</h2>
        <div className="token-input-wrapper">
          {code.map((digit, idx) => (
            <input
              key={idx}
              className={`token-box ${invalidToken ? 'error' : ''}`}
              defaultValue={digit}
              maxLength={codeLength}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputRefs.current[idx] = el!)}
            />
          ))}
        </div>
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
