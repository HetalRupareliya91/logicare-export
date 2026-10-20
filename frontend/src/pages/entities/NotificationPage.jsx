import { useEffect, useState } from 'react';
import { notificationService } from '../../services/notificationService';

export const meta = { title: 'Notifications', path: 'notifications' };

export default function NotificationPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    notificationService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Notifications</h1>
        <input className="search" placeholder="Search notifications..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.title}</h3>
              <p><span>Message:</span> {item.message ?? '-'}</p>
              <p><span>Audience:</span> {item.audience ?? '-'}</p>
              <p><span>Read:</span> {item.read ? 'Yes' : 'No'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
