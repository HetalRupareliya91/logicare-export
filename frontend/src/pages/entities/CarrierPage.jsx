import { useEffect, useState } from 'react';
import { carrierService } from '../../services/carrierService';

export const meta = { title: 'Carriers', path: 'carriers' };

export default function CarrierPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    carrierService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Carriers</h1>
        <input className="search" placeholder="Search carriers..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.name}</h3>
              <p><span>SCAC Code:</span> {item.scac ?? '-'}</p>
              <p><span>Mode:</span> {item.mode ?? '-'}</p>
              <p><span>Contact Email:</span> {item.contactEmail ?? '-'}</p>
              <p><span>Active:</span> {item.active ? 'Yes' : 'No'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
