import { useEffect, useState } from 'react';
import { api } from '../api/client';
import StatCard from '../components/StatCard';

export default function Dashboard({ modules }) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    modules.forEach((m) => {
      api.get('/' + m.path + '?limit=1')
        .then((r) => setCounts((c) => ({ ...c, [m.path]: r.total })))
        .catch(() => setCounts((c) => ({ ...c, [m.path]: '-' })));
    });
  }, [modules]);

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="muted">Overview of import and export operations</p>
      <div className="stats">
        {modules.map((m) => (
          <StatCard key={m.path} title={m.title} value={counts[m.path] ?? '…'} to={'/' + m.path} />
        ))}
      </div>
      {!modules.length && <p className="muted">No modules registered yet.</p>}
    </section>
  );
}
