import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './features/auth/pages/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </Router>
  )
}

export default App
