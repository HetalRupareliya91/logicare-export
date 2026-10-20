import { useEffect, useState } from 'react';
import { portService } from '../../services/portService';

export const meta = { title: 'Ports', path: 'ports' };

export default function PortPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    portService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Ports</h1>
        <input className="search" placeholder="Search ports..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.name}</h3>
              <p><span>UN/LOCODE:</span> {item.code ?? '-'}</p>
              <p><span>Country:</span> {item.country ?? '-'}</p>
              <p><span>Type (Sea/Air/ICD):</span> {item.type ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
