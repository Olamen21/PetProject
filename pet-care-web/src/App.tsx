import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './features/auth/pages/SignUpPage';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
