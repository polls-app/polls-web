import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyPage from './pages/VerifyPage';
import RecommendationPage from './pages/RecommendationPage';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ProfilePage from './pages/ProfilePage';
import CreatePollPage from './pages/CreatePollPage';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  console.log("token ", token)
  console.log("email verified ", emailVerified)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = JSON.parse(atob(storedToken.split('.')[1]));
        setEmailVerified(decoded?.email_verified === 'true');
      } catch {
        setEmailVerified(false);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={token && !emailVerified ? <VerifyPage /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={
            token
              ? emailVerified
                ? <RecommendationPage />
                : <Navigate to="/verify" />
              : <Navigate to="/login" />
          }
        />
        <Route path="/password-reset-request" element={<PasswordResetRequestPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/create" element={<CreatePollPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
