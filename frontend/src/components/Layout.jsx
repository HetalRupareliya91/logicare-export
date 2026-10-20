import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ pages }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">LogiCare <span>Export</span></NavLink>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <nav className={open ? 'nav open' : 'nav'} onClick={() => setOpen(false)}>
          <NavLink to="/" end>Home</NavLink>
          {pages.map((p) => <NavLink key={p.path} to={'/' + p.path}>{p.title}</NavLink>)}
        </nav>
        <div className="user">
          <span>{user && user.name}</span>
          <button className="link" onClick={logout}>Logout</button>
        </div>
      </header>
      <main className="container"><Outlet /></main>
      <footer className="footer">© 2026 LogiCare Export · Import &amp; Export Services</footer>
    </div>
  );
}
