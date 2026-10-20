import { useEffect, useState } from 'react';
import { shipmentService } from '../../services/shipmentService';

export const meta = { title: 'Shipments', path: 'shipments' };

export default function ShipmentPage() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    shipmentService.list({ q })
      .then((res) => { setItems(res.items || []); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className="page">
      <header className="page-head">
        <h1>Shipments</h1>
        <input className="search" placeholder="Search shipments..." value={q} onChange={(e) => setQ(e.target.value)} />
      </header>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="muted">Loading...</p> : (
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item._id}>
              <h3>{item.shipmentNo}</h3>
              <p><span>Order No:</span> {item.orderNo ?? '-'}</p>
              <p><span>Mode (Sea/Air/Road):</span> {item.mode ?? '-'}</p>
              <p><span>Origin Port:</span> {item.originPort ?? '-'}</p>
              <p><span>Destination Port:</span> {item.destinationPort ?? '-'}</p>
              <p><span>ETD:</span> {item.etd ? new Date(item.etd).toLocaleDateString() : '-'}</p>
              <p><span>ETA:</span> {item.eta ? new Date(item.eta).toLocaleDateString() : '-'}</p>
              <p><span>Status:</span> {item.status ?? '-'}</p>
            </article>
          ))}
          {!items.length && <p className="muted">No records found.</p>}
        </div>
      )}
    </section>
  );
}
