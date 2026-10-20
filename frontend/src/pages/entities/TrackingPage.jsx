import { useEffect, useState } from 'react';
import { trackingService } from '../../services/trackingService';

export const meta = { title: 'Tracking Events', path: 'tracking-events' };

export default function TrackingPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    trackingService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Tracking Events</h1>
        <input className="search" placeholder="Search tracking events..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.shipmentNo}</h3>
              <p><span>Location:</span> {item.location ?? '-'}</p>
              <p><span>Event:</span> {item.event ?? '-'}</p>
              <p><span>Event Time:</span> {item.eventTime ? new Date(item.eventTime).toLocaleDateString() : '-'}</p>
              <p><span>Remarks:</span> {item.remarks ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
