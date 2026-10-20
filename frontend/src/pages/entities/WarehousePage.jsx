import { useEffect, useState } from 'react';
import { warehouseService } from '../../services/warehouseService';

export const meta = { title: 'Warehouses', path: 'warehouses' };

export default function WarehousePage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    warehouseService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Warehouses</h1>
        <input className="search" placeholder="Search warehouses..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.name}</h3>
              <p><span>Location:</span> {item.location ?? '-'}</p>
              <p><span>Capacity (CBM):</span> {item.capacity ?? '-'}</p>
              <p><span>Manager:</span> {item.manager ?? '-'}</p>
              <p><span>Bonded:</span> {item.bonded ? 'Yes' : 'No'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
