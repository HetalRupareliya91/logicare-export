import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

const loaded = Object.values(import.meta.glob('./pages/entities/*.jsx', { eager: true }));
export const entityPages = loaded
  .map((m) => ({ ...m.meta, Component: m.default }))
  .sort((a, b) => a.title.localeCompare(b.title));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout pages={entityPages} /></ProtectedRoute>}>
            <Route index element={<Home pages={entityPages} />} />
            {entityPages.map((p) => (
              <Route key={p.path} path={p.path} element={<p.Component />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
