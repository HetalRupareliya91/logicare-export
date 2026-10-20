import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar({ modules }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>☰ Menu</button>
      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <div className="logo">LogiCare <b>Admin</b></div>
        <nav onClick={() => setOpen(false)}>
          <NavLink to="/" end>Dashboard</NavLink>
          {modules.map((m) => <NavLink key={m.path} to={'/' + m.path}>{m.title}</NavLink>)}
        </nav>
        <button className="logout" onClick={logout}>Logout</button>
      </aside>
    </>
  );
}
