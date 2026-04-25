import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './features/auth/pages/SignUpPage';
import LoginPage from './features/auth/pages/LoginPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import ProfilePage from './features/ProfilePage/pages/ProfilePage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';
import EditProfilePage from './features/ProfilePage/pages/EditProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
