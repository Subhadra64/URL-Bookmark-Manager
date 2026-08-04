import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function ProtectedRoute({ children }) { const { user, loading } = useAuth(); return loading ? <main className="centered">Loading your account…</main> : user ? children : <Navigate to="/login" replace />; }
function PublicRoute({ children }) { const { user, loading } = useAuth(); return loading ? <main className="centered">Loading…</main> : user ? <Navigate to="/" replace /> : children; }

function App() { return <Routes><Route path="/login" element={<PublicRoute><AuthPage mode="login" /></PublicRoute>} /><Route path="/register" element={<PublicRoute><AuthPage mode="register" /></PublicRoute>} /><Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>; }

export default App;
