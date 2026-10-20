import { useEffect, useState } from 'react';
import { containerService } from '../../services/containerService';

export const meta = { title: 'Containers', path: 'containers' };

export default function ContainerPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    containerService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Containers</h1>
        <input className="search" placeholder="Search containers..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.containerNo}</h3>
              <p><span>Size:</span> {item.size ?? '-'}</p>
              <p><span>Seal No:</span> {item.sealNo ?? '-'}</p>
              <p><span>Shipment No:</span> {item.shipmentNo ?? '-'}</p>
              <p><span>Gross Weight (kg):</span> {item.grossWeight ?? '-'}</p>
              <p><span>Reefer:</span> {item.isReefer ? 'Yes' : 'No'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
