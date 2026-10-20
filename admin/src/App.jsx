import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const loaded = Object.values(import.meta.glob('./pages/modules/*/List.jsx', { eager: true }));
export const modules = loaded
  .map((m) => ({ ...m.meta, Component: m.default }))
  .sort((a, b) => a.title.localeCompare(b.title));

function Shell() {
  if (!localStorage.getItem('admin_token')) return <Navigate to="/login" replace />;
  return (
    <div className="shell">
      <Sidebar modules={modules} />
      <main className="content"><Outlet /></main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Shell />}>
          <Route index element={<Dashboard modules={modules} />} />
          {modules.map((m) => (
            <Route key={m.path} path={m.path} element={<m.Component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
